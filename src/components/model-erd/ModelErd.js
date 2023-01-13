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
import { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { styled } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { random } from 'lodash/fp';
import ButtonEdge from './ButtonEdge';
import { useTablesQuery } from '../../hooks/tables.hooks';
import { isEmpty } from 'lodash';
import {
    useCreateFusionMutation,
    useFusionsQuery,
} from '../../hooks/fusions.hooks';
import { JOIN_TYPE } from '../../constants/entity.constants';

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
                            id={`target-${id}`}
                        />
                        {name}
                        <StyledSourceHandle
                            type="source"
                            position="right"
                            id={`source-${id}`}
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

// const initialEdges = [
//     {
//         id: uuidv4(),
//         source: initialNodes[0].id,
//         target: initialNodes[1].id,
//         type: 'buttonedge',
//         sourceHandle: `source-${initialNodes[0].data.columns[0].id}`,
//         targetHandle: `target-${initialNodes[1].data.columns[1].id}`,
//     },
// ];

const ModelErd = ({ modelId }) => {
    const { data: tables, isLoading: isTablesLoading } =
        useTablesQuery(modelId);

    const { data: fusions, isLoading: isFusionsLoading } =
        useFusionsQuery(modelId);

    const { mutate: createFusion } = useCreateFusionMutation(modelId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params,...rest) => {
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

        const { nodes, nodesToBatchUpdate } = tables.reduce(
            (acc, curr) => {
                curr.type = 'tableNode';
                curr.data = { name: curr.name, columns: curr.columns };
                if (!curr.nodePosition) {
                    curr.position = { x: random(0, 1200), y: random(0, 500) };
                    curr.nodePosition = curr.position;
                    acc.nodesToBatchUpdatePositions.push(curr);
                } else {
                    curr.position = curr.nodePosition;
                }
                acc.nodes.push(curr);

                return acc;
            },
            {
                nodes: [],
                nodesToBatchUpdatePositions: [],
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
                    id
                }
            })
        );

        setEdges(edges);
    }, [fusions]);

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
