import { memo } from 'react';
import * as React from 'react';
import { styled } from '@mui/material';
import { Handle } from 'reactflow';

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
`;

const StyledTargetHandle = styled(Handle)`
    background: red;
    position: absolute;
`;

const StyledSourceHandle = styled(Handle)`
    background: blue;
    position: absolute;
`;

export default TableNode;
