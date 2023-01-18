import { memo, useCallback, useContext } from 'react';
import * as React from 'react';
import { styled } from '@mui/material';
import { Handle } from 'reactflow';
import targetIcon from '../../../assets/target.svg';
import arrowRight from '../../../assets/arrow_right.svg';

import Typography from '@mui/material/Typography';
import {
    COLUMN_TYPE,
    COLUMN_TYPE_ICONS,
} from '../../../constants/app.constants';
import { ModelErdContext } from './ModelErd';

const TableNode = memo(({ data, id }) => {
    const { name, columns } = data;
    const { nodeStartingConnection, tableDependencies } =
        useContext(ModelErdContext);
    const isTargetConnectable = useCallback(
        (type) => {
            return (
                type !== COLUMN_TYPE.DATE &&
                !!nodeStartingConnection &&
                nodeStartingConnection.colType === type &&
                !tableDependencies[id]?.[nodeStartingConnection.nodeId] &&
                id !== nodeStartingConnection.nodeId
            );
        },
        [id, nodeStartingConnection, tableDependencies]
    );
    return (
        <TableNodeContainer>
            <div>
                <Typography textAlign="center" variant="h5" style={{ fontSize: '20px', color: "white" , fontWeight: 500}}>
                    {name}
                </Typography>
            </div>
            <TableBody>
                {columns.map(({ id, name, type }) => (
                    <ColumnRow key={id}>
                        <StyledTargetHandle
                            isConnectable={isTargetConnectable(type)}
                            type="target"
                            position="left"
                            id={id}
                        />
                        {COLUMN_TYPE_ICONS[type]}
                        <ColumnName>
                            <Typography
                                sx={{
                                    p: 2,
                                }}
                                variant="span"
                                textAlign="center"
                                noWrap
                            >
                                {name}
                            </Typography>
                        </ColumnName>
                        <StyledSourceHandle
                            isConnectable={type !== COLUMN_TYPE.DATE}
                            type="source"
                            position="right"
                            id={id}
                            data-coltype={type}
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
    background: rgb(85, 108, 214);
        // rgb(121, 137, 212)
    box-sizing: border-box;
    border: 1px solid gray;
    padding: 5px;
    border-radius: 5px;
    min-width: 150px;
    font-family: 'Fira Mono', Monospace;
    font-weight: 500;
    letter-spacing: -0.3px;
    box-shadow: -5px 0 15px rgba(93, 91, 91, 0.5);
`;

const TableBody = styled('div')`
    background: rgb(245, 246, 252);
    // padding: 16px 0;
    // border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    // overflow: hidden;
    position: relative;
`;

const ColumnRow = styled('div')`
    position: relative;
    padding: 5px;
    display: flex;
    align-items: center;
    // border-radius: 10px;

    &:nth-child(odd) {
        background-color: white;
    }
`;

const ColumnName = styled('span')`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    right: 10px;
`;

const StyledTargetHandle = styled(Handle)`
    position: absolute;
    background: transparent;
    border: none;

    &:after {
        position: absolute;
        background-image: url(${targetIcon});
        background-size: 20px 25px;
        display: ${({ isConnectable }) =>
            isConnectable ? `inline-block` : 'none'};
        width: 20px;
        height: 25px;
        content: '';
        top: -11px;
        left: -10px;
    }
`;

const StyledSourceHandle = styled(Handle)`
    position: absolute;
    background: transparent;
    border: none;
    &:after {
        position: absolute;
        background-image: url(${arrowRight});
        background-size: 30px 35px;
        display: ${({ isConnectable }) =>
            isConnectable ? `inline-block` : 'none'};
        width: 30px;
        height: 35px;
        content: '';
        top: -13px;
        left: -6px;
    }
`;

// &:after {
//     position: absolute;
//     background-image: url(${blackArrow});
//     background-size: 30px 35px;
//     display: ${({ isConnectable }) =>
//         isConnectable ? `inline-block` : 'none'};
//     width: 30px;
//     height: 35px;
//     content: '';
//     top: -13px;
//     left: -5px;
// }

export default TableNode;
