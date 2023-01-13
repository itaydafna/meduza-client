import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import { fetchTables, createTable, updateTable } from '../mock-requests';

export const useTablesQuery = (modelId) => {
    const query = useQuery(QUERY_KEYS.TABLES(modelId), () =>
        fetchTables(modelId)
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

export const useUpdateTableMutation = (modelId) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateTable,
        onMutate: async (table) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });

            const previousTables = queryClient.getQueryData(
                QUERY_KEYS.TABLES(modelId)
            );

            queryClient.setQueryData(
                QUERY_KEYS.TABLES(modelId),(old)=>
                old.map((t) => (t.id === table.id ? table : t))
            );

            return { previousTables };
        },

        onError: (err, newTodo, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.TABLES(modelId),
                context.previousTables
            );
        },
        onSettled: (table) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TABLES(modelId),
            });
        },
    });

    return mutation;
};
