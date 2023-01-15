import * as React from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
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
} from '../../../hooks/fusions.hooks';
import { JOIN_TYPE } from '../../../constants/entity.constants';
import {
    transformNodeToTable,
    transformTableToNode,
} from '../../../utils/entities.utils';
import { ModelContext } from '../../App';

import TableNode from './TableNode';
import { Fab, styled } from '@mui/material';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import TableDialog from '../TableDialog';
import QueryBuilderDialog from '../../query-builder/QueryBuilderDialog';

const nodeTypes = {
    tableNode: TableNode,
};

const edgeTypes = {
    buttonedge: ButtonEdge,
};

const ModelErd = () => {
    const modelId = useContext(ModelContext);
    const { data: tables } = useTablesQuery(modelId);

    const { data: fusions } = useFusionsQuery(modelId);

    const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
    const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
    const toggleTableDialog = () => setIsTableDialogOpen((isOpen) => !isOpen);
    const closeTableDialog = () => setIsTableDialogOpen(false);

    const toggleBuilderDialog = () =>
        setIsBuilderDialogOpen((isOpen) => !isOpen);
    const closeBuilderDialog = () => setIsBuilderDialogOpen(false);

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
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                    <BottomActionButtons>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={toggleTableDialog}
                        >
                            <TableChartSharpIcon />
                        </Fab>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={toggleBuilderDialog}
                        >
                            Create Query
                        </Fab>
                    </BottomActionButtons>
                </FlexWrapper>
                <TableDialog
                    isOpen={isTableDialogOpen}
                    handleClose={closeTableDialog}
                />
                <QueryBuilderDialog
                    isOpen={isBuilderDialogOpen}
                    handleClose={closeBuilderDialog}
                />
            </ReactFlowProvider>
        </div>
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
