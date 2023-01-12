import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import Portal from '@mui/base/Portal';
import ModelNameTooltip from './ModelNameTooltip';
import { useModelNameTooltip } from '../hooks/models.hooks';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';

const TabLabel = ({ label, onDelete, onEdit }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonsRef = useRef(null);

    const {
        isModelNameTooltipOpen,
        openModelNameTooltip,
        closeModelNameTooltip,
    } = useModelNameTooltip();

    const onEditSubmit = (name) => {
        onEdit(name);
        closeModelNameTooltip();
    };

    const onClickDelete = (event)=> {
        event.stopPropagation();
        onDelete();
    }

    const onClickEdit = (event)=> {
        openModelNameTooltip();
    }

    return (
        <StyledTabLabel
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label}
            <Buttons ref={buttonsRef}>
                {isHovered || isModelNameTooltipOpen ? (
                    <Portal container={buttonsRef.current}>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={onClickDelete}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>

                        <ModelNameTooltip
                            closeModelNameTooltip={closeModelNameTooltip}
                            onSubmit={onEditSubmit}
                            isModelNameTooltipOpen={isModelNameTooltipOpen}
                            isNew={false}
                            initialValue={label}
                        >
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={onClickEdit}
                            >
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </ModelNameTooltip>
                    </Portal>
                ) : null}
            </Buttons>
        </StyledTabLabel>
    );
};

const StyledTabLabel = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`;

const Buttons = styled.div`
    display: inline-flex;
    align-items: center;
    width: 50px;
    margin-left: 10px;
    height: 25px;
    pointer-events: all;
`;

export default TabLabel;
