import * as React from 'react';
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    addEdge,
    Handle,
    useNodesState,
    useEdgesState,
    useNodes,
    useEdges, ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useMemo, useState, memo } from 'react';
import { styled } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { random } from 'lodash/fp';
import ButtonEdge from './ButtonEdge';

function generateMockTables(num) {
    return Array.from({ length: num }).map((_, idx) => {
        const tableName = `Table ${idx + 1}`;
        const table = {
            id: `${uuidv4()}`,
            name: tableName,
            columns: Array.from({ length: random(3, 7) }).map((_, idx) => ({
                id: `${uuidv4()}`,
                name: `Column ${idx + 1} (${tableName})`,
            })),
        };
        return table;
    });
}

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

export const MOCK_TABLES = generateMockTables(5);

const initialNodes = generateMockTables(5).map(({ id, name, columns }) => ({
    id,
    data: { name, columns },
    position: { x: random(0, 1200), y: random(0, 500) },
    type: 'tableNode',
}));

const initialEdges = [
    {
        id: uuidv4(),
        source: initialNodes[0].id,
        target: initialNodes[1].id,
        type: 'buttonedge',
        sourceHandle: `source-${initialNodes[0].data.columns[0].id}`,
        targetHandle: `target-${initialNodes[1].data.columns[1].id}`,
    },
];

const ModelErd = ({ id }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, type: 'buttonedge', selected: true }, eds)
            ),
        []
    );

    return (
        <div style={{ height: '100%' }}>
            <ReactFlowProvider>
                <ReactFlow
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
