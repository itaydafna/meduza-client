import { random, groupBy,flow } from 'lodash/fp';
import {map, values} from "lodash";

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
    nodePosition: node.position
});


export const generateKipodQuery = ({modelId,columns, filters, filtersOperation,limit, orderByDirection,orderByColumn, tableNameById})=>{
    return {
        modelId,
        limit,
        filters: {
           operands:  filters.map(filter => ({
                tableName: tableNameById[filter.tableId],
                columnName: filter.column.name,
                filterExpression: filter.operator.id,
                value: filter.value,
                type: filter.column.type
            })),
            booleanOperator: filtersOperation
        },
        orderBy:{tableName: tableNameById[orderByColumn.tableId], columnName: orderByColumn.name, order: orderByDirection},
        // selectedTables: columns.map((col)=>({
        //     tableId: col.tableId,
        //     selectedColumn: flow([groupBy('tableId'), values,map(({})=>)])(columns)
        // }))
    }

}
