import * as React from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonEdge from './ButtonEdge';
import {
    useTablesQuery,
    useUpdateTableMutation,
} from '../../../hooks/tables.hooks';
import { noop } from 'lodash';
import {
    useCreateFusionMutation,
    useFusionsQuery,
    useTableDependencies,
} from '../../../hooks/fusions.hooks';
import { JOIN_TYPE } from '../../../constants/entity.constants';
import {
    transformNodeToTable,
    transformTableToNode,
} from '../../../utils/entities.utils';
import { ModelContext } from '../../App';

import TableNode from './TableNode';
import { styled } from '@mui/material';

const nodeTypes = {
    tableNode: TableNode,
};

const edgeTypes = {
    buttonedge: ButtonEdge,
};

export const ModelErdContext = React.createContext();

const ModelErd = () => {
    const modelId = useContext(ModelContext);

    const { data: tables } = useTablesQuery(modelId);
    const { data: fusions } = useFusionsQuery(modelId);

    const { mutate: createFusion } = useCreateFusionMutation(modelId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [selectedEdge, setSelectedEdge] = useState(null);
    const [nodeStartingConnection, setNodeStartingConnection] = useState(null);

    const onConnect = useCallback(
        (params, ...rest) => {
            setEdges((eds) =>
                addEdge({ ...params, type: 'buttonedge', selected: true }, eds)
            );
            const { source, target, sourceHandle, targetHandle } = params;
            const id = uuidv4();
            setSelectedEdge(id);
            createFusion({
                id,
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
                selected: id === selectedEdge,
                animated: true,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
                data: {
                    id,
                },
            })
        );
        setEdges(edges);
    }, [fusions, selectedEdge, setEdges]);

    const { mutate: updateTable } = useUpdateTableMutation(modelId);

    const onNodeDragStop = useCallback(
        (_, node) => {
            const table = transformNodeToTable(node, modelId);
            updateTable(table);
        },
        [modelId, updateTable]
    );

    const onConnectionStart = (event, { nodeId, handleId }) => {
        const colType = event.target.dataset.coltype;
        setNodeStartingConnection({ nodeId, handleId, colType });
    };

    const onConnectEnd = () => {
        setNodeStartingConnection(null);
    };

    const { tableDependencies } = useTableDependencies(modelId);


    return (
        <ModelErdContext.Provider
            value={{ nodeStartingConnection, tableDependencies }}
        >
            <div style={{ height: '100%' }}>
                <ReactFlowProvider>
                    <FlexWrapper>
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
                            onConnectStart={onConnectionStart}
                            onConnectEnd={onConnectEnd}
                        >
                            <Background />
                            <Controls />
                        </ReactFlow>
                        <BottomActionButtons></BottomActionButtons>
                    </FlexWrapper>
                </ReactFlowProvider>
            </div>
        </ModelErdContext.Provider>
    );
};

const FlexWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const BottomActionButtons = styled('div')`
    margin-top: auto;
`;

export default ModelErd;
