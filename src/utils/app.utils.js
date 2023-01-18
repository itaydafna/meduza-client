import { random, groupBy, flow, set, entries, reduce } from 'lodash/fp';
import { NUMBER_FILTER_OPTIONS } from '../constants/app.constants';

export const transformTableToNode = (table) => ({
    id: table.id,
    type: 'tableNode',
    data: { columns: table.columns, name: table.name },
    position: table.nodePosition || { x: random(0, 1200), y: random(0, 500) },
});

export const transformNodeToTable = (node, modelId) => ({
    id: node.id,
    modelId,
    name: node.data.name,
    columns: node.data.columns,
    nodePosition: node.position,
});

export const generateKipodQuery = ({
    modelId,
    columns,
    filters,
    filtersOperation,
    limit,
    orderByDirection,
    orderByColumn,
    tableNameById,
}) => {
    console.log({filters});
    return {
        modelId,
        limit,
        filters: {
            operands: filters.map((filter) => ({
                tableName: tableNameById[filter.column.tableId],
                columnName: filter.column.name,
                filterExpression: filter.operator.id,
                value: filter.value,
                dataType: filter.column.type,
                filterType:
                    filter.column.type === 'STRING' ||
                    filter.column.type === 'DATE'
                        ? 'STRING'
                        : filter.operator.id === NUMBER_FILTER_OPTIONS.IN ||
                          filter.operator.id === NUMBER_FILTER_OPTIONS.NOT_IN
                        ? 'GROUP'
                        : 'NUMBER',
            })),
            booleanOperator: filtersOperation,
        },
        orderBy: {
            tableName: tableNameById[orderByColumn.tableId],
            columnName: orderByColumn.name,
            order: orderByDirection,
        },
        selectedTables: flow([
            groupBy('tableId'),
            entries,
            reduce((acc, [tableId, cols]) => {
                return set(
                    [tableId],
                    cols.map(({ name }) => name),
                    acc
                );
            }, {}),
        ])(columns),
    };
};
