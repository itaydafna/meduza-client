import { useFusion, useUpdateFusionMutation } from '../../hooks/fusions.hooks';
import { ModelContext } from '../App';
import React, { useCallback, useContext, useState } from 'react';
import { useTable } from '../../hooks/tables.hooks';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import { keys } from 'lodash';
import { JOIN_TYPE } from '../../constants/app.constants';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import JoinInnerIcon from '@mui/icons-material/JoinInner';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';

const FusionForm = ({ fusionsId }) => {
    const modelId = useContext(ModelContext);
    const { data: fusion } = useFusion(modelId, fusionsId);

    const [sourceTableId, setSourceTableId] = useState(fusion.sourceTable);
    const [targetTableId, setTargetTableId] = useState(fusion.targetTable);

    const { data: sourceTable } = useTable(modelId, sourceTableId);
    const { data: targetTable } = useTable(modelId, targetTableId);

    const [sourceColumn, setSourceColumn] = useState(fusion.sourceColumn);
    const [targetColumn, setTargetColumn] = useState(fusion.targetColumn);
    const [joinType, setJoinType] = useState(fusion.joinType);

    const onSwitch = useCallback(() => {
        setSourceTableId(targetTableId);
        setTargetTableId(sourceTableId);
        setSourceColumn(targetColumn);
        setTargetColumn(sourceColumn);
    }, [sourceColumn, sourceTableId, targetColumn, targetTableId]);

    const { mutate: updateFusion } = useUpdateFusionMutation(modelId);

    const onSubmit = useCallback(() => {
        const fusionToUpdate = {
            id: fusionsId,
            joinType,
            modelId,
            sourceTable: sourceTableId,
            targetTable: targetTableId,
            sourceColumn,
            targetColumn,
        };
        updateFusion({ fusion: fusionToUpdate, modelId });
    }, [
        fusionsId,
        joinType,
        modelId,
        sourceColumn,
        sourceTableId,
        targetColumn,
        targetTableId,
        updateFusion,
    ]);

    return (
        <Container>
            <FusionName>{`${sourceTable.name} : ${targetTable.name}`}</FusionName>
            <ColumnSelections>
                <TextField
                    size="small"
                    label="Source Column"
                    value={sourceColumn}
                    onChange={({ target: { value } }) => setSourceColumn(value)}
                    select
                >
                    {sourceTable.columns.map((col) => (
                        <MenuItem key={col.id} value={col.id}>
                            {col.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    size="small"
                    label="Target Column"
                    value={targetColumn}
                    onChange={({ target: { value } }) => setTargetColumn(value)}
                    select
                >
                    {targetTable.columns.map((col) => (
                        <MenuItem key={col.id} value={col.id}>
                            {col.name}
                        </MenuItem>
                    ))}
                </TextField>
            </ColumnSelections>
            <SwitchColumnsRow>
                <IconButton onClick={onSwitch}>
                    <CompareArrowsIcon />
                </IconButton>
            </SwitchColumnsRow>

            <div style={{ display: 'flex' }}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Join Type
                    </FormLabel>
                    <ToggleButtonGroup
                        color="primary"
                        value={fusion.joinType}
                        exclusive
                        onChange={({ target: { value } }) => setJoinType(value)}
                        aria-label="Platform"
                    >
                        <ToggleButton value={JOIN_TYPE.INNER}>
                            Inner
                        </ToggleButton>
                        <ToggleButton value={JOIN_TYPE.FULL}>Full</ToggleButton>
                        <ToggleButton value={JOIN_TYPE.LEFT}>Left</ToggleButton>
                        <ToggleButton value={JOIN_TYPE.RIGHT}>
                            Right
                        </ToggleButton>
                    </ToggleButtonGroup>
                </FormControl>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '80%',
                }}
            >
                <Button onClick={onSubmit}>Cancel</Button>
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </Container>
    );
};

const Container = styled('div')`
    padding: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FusionName = styled('div')`
    color: ${({ theme }) => theme.palette.darkGrey};
    font-weight: 500;
    font-size: 18px;
    text-align: center;
`;

const ColumnSelections = styled('div')`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SwitchColumnsRow = styled('div')`
    display: flex;
    justify-content: center;
`;
export default FusionForm;
