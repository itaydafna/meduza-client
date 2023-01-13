import { random } from 'lodash/fp';

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
