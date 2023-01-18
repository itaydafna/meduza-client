import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import { createTable } from '../mock-requests';
import { set } from 'lodash/fp';
import { getTables, updateTables } from '../services/requests';

export const useTablesQuery = (modelId) => {
    const query = useQuery(QUERY_KEYS.TABLES(modelId), () =>
        getTables(modelId)
    );
    return query;
};

export const useTable = (modelId, tableId) => {
    const query = useQuery(
        QUERY_KEYS.TABLES(modelId),
        () => getTables(modelId),
        { select: (tables) => tables.find((table) => table.id === tableId) }
    );
    return query;
};

export const useCreateTableMutation = (modelId) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTable,
        onMutate: async (newTable) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });
            const previousTables = queryClient.getQueryData([
                QUERY_KEYS.TABLES(modelId),
            ]);
            queryClient.setQueryData(QUERY_KEYS.TABLES(modelId), (old) => [
                ...old,
                newTable,
            ]);
            return { previousTables };
        },
        onError: (err, newTable, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.TABLES(modelId),
                context.previousTables
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });
        },
    });
    return mutation;
};

export const useUpdateTablesMutation = (modelId) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ({ modelId, tables}) => updateTables({ modelId, tables }),
        onMutate: async ({ modelId, tables }) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });

            const previousTables = queryClient.getQueryData(
                QUERY_KEYS.TABLES(modelId)
            );

            queryClient.setQueryData(QUERY_KEYS.TABLES(modelId), (old) =>
                old.map((t) => {
                    const toUpdate = tables.find((table) => table.id === t.id);
                    return toUpdate || t;
                })
            );

            return { previousTables };
        },

        onError: (err, _, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.TABLES(modelId),
                context.previousTables
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });
        },
    });

    return mutation;
};

export const useAllModelColumns = (modelId) => {
    const query = useQuery(
        QUERY_KEYS.TABLES(modelId),
        () => getTables(modelId),
        {
            select: (tables) => {
                const allCols = [];
                tables.forEach((table) => {
                    table.columns.forEach((col) => {
                        col.tableId = table.id;
                        col.tableName = table.name;
                        allCols.push(col);
                    });
                });
                return allCols;
            },
        }
    );
    return query;
};

export const useTableNameById = (modelId) => {
    const query = useQuery(
        QUERY_KEYS.TABLES(modelId),
        () => getTables(modelId),
        {
            select: (tables) => {
                let tableNameById = {};
                tables.forEach(({ id, name }) => {
                    tableNameById = set([id], name)(tableNameById);
                });
                return tableNameById;

            },
        }
    );
    return query;
};
