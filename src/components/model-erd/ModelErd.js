import * as React from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    Handle,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, memo, useEffect } from 'react';
import { styled } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ButtonEdge from './ButtonEdge';
import {
    useTablesQuery,
    useUpdateTableMutation,
} from '../../hooks/tables.hooks';
import { isEmpty, noop } from 'lodash';
import {
    useCreateFusionMutation,
    useFusionsQuery,
} from '../../hooks/fusions.hooks';
import { JOIN_TYPE } from '../../constants/entity.constants';
import {
    transformNodeToTable,
    transformTableToNode,
} from '../../utils/entities.utils';

const TableNode = memo(({ data }) => {
    const { name, columns } = data;
    return (
        <TableNodeContainer>
            <div>{name}</div>
            <TableBody>
                {columns.map(({ id, name }) => (
                    <ColumnRow key={id}>
                        <StyledTargetHandle
                            type="target"
                            position="left"
                            id={id}
                        />
                        {name}
                        <StyledSourceHandle
                            type="source"
                            position="right"
                            id={id}
                        />
                    </ColumnRow>
                ))}
            </TableBody>
        </TableNodeContainer>
    );
});

const nodeTypes = {
    tableNode: TableNode,
};

const edgeTypes = {
    buttonedge: ButtonEdge,
};

const ModelErd = ({ modelId }) => {
    const { data: tables, isLoading: isTablesLoading } =
        useTablesQuery(modelId);

    const { data: fusions, isLoading: isFusionsLoading } =
        useFusionsQuery(modelId);

    const { mutate: createFusion } = useCreateFusionMutation(modelId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params, ...rest) => {
            setEdges((eds) =>
                addEdge({ ...params, type: 'buttonedge', selected: true }, eds)
            );
            const { source, target, sourceHandle, targetHandle } = params;
            createFusion({
                id: uuidv4(),
                joinType: JOIN_TYPE.INNER,
                sourceTable: source,
                targetTable: target,
                sourceColumn: sourceHandle,
                targetColumn: targetHandle,
                modelId,
            });
        },
        [createFusion, modelId, setEdges]
    );

    useEffect(() => {
        if (!tables) return;

        const { nodes } = tables.reduce(
            (acc, table) => {
                const node = transformTableToNode(table);
                if (!table.nodePosition) {
                    table.nodePosition = node.position;
                    acc.tablesToBatchUpdate.push(table);
                }
                acc.nodes.push(node);
                return acc;
            },
            {
                nodes: [],
                tablesToBatchUpdate: [],
            }
        );

        setNodes(nodes);
    }, [setNodes, tables]);

    useEffect(() => {
        if (!fusions) return;
        const edges = fusions.map(
            ({ id, sourceTable, targetTable, sourceColumn, targetColumn }) => ({
                id,
                source: sourceTable,
                target: targetTable,
                type: 'buttonedge',
                sourceHandle: sourceColumn,
                targetHandle: targetColumn,
                data: {
                    id,
                },
            })
        );
        setEdges(edges);
    }, [fusions, setEdges]);

    const { mutate: updateTable } = useUpdateTableMutation(modelId);

    const onNodeDragStop = useCallback(
        (_, node) => {
            const table = transformNodeToTable(node, modelId);
            updateTable(table);
        },
        [modelId, updateTable]
    );

    return (
        <div style={{ height: '100%' }}>
            {isTablesLoading || isFusionsLoading ? (
                'Tables Loading'
            ) : isEmpty(tables) ? (
                'Empty State'
            ) : (
                <ReactFlowProvider>
                    <ReactFlow
                        id={modelId}
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onNodeDragStart={noop}
                        onNodeDragStop={onNodeDragStop}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            )}
        </div>
    );
};

export default ModelErd;

const TableNodeContainer = styled('div')`
    display: flex;
    flex-direction: column;
    background: white;
    box-sizing: border-box;
    border: 1px solid gray;
    padding: 5px;
    border-radius: 5px;
`;

const TableBody = styled('div')``;

const ColumnRow = styled('div')`
    position: relative;
    padding: 5px 10px;
    //width: 1000px;
`;

const StyledTargetHandle = styled(Handle)`
    background: red;
    position: absolute;
`;

const StyledSourceHandle = styled(Handle)`
    background: blue;
    position: absolute;
`;
