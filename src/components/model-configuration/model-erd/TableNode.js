import { memo, useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import { styled } from '@mui/material';
import { Handle } from 'reactflow';
import targetIcon from '../../../assets/target.svg';
import arrowIcon from '../../../assets/arrow.svg';
import Typography from '@mui/material/Typography';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { COLUMN_TYPE } from '../../../constants/entity.constants';
import { ModelErdContext } from './ModelErd';

const COLUMN_TYPE_ICONS = {
    [COLUMN_TYPE.STRING]: <TextFieldsIcon />,
    [COLUMN_TYPE.NUMBER]: <NumbersIcon />,
    [COLUMN_TYPE.DATE]: <CalendarMonthIcon />,
};

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
                <Typography textAlign="center" variant="h5">
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
    display: flex;
    align-items: center;
`;

const ColumnName = styled('span')`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    right: 10px;
`;

const StyledTargetHandle = styled(Handle)`
    position: absolute;
    background: none;

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
        left: -12px;
    }
`;

const StyledSourceHandle = styled(Handle)`
    position: absolute;
    background: none;
    &:after {
        position: absolute;
        background-image: url(${arrowIcon});
        background-size: 30px 35px;
        display: ${({ isConnectable }) =>
            isConnectable ? `inline-block` : 'none'};
        width: 30px;
        height: 35px;
        content: '';
        top: -13px;
        left: -5px;
    }
`;

export default TableNode;
