import { useFusion, useUpdateFusionMutation } from '../../hooks/fusions.hooks';
import { ModelContext } from '../App';
import { useCallback, useContext, useState } from 'react';
import { useTable } from '../../hooks/tables.hooks';
import { Button, MenuItem, Select, styled } from '@mui/material';
import { keys } from 'lodash';
import { JOIN_TYPE } from '../../constants/entity.constants';

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
        updateFusion(fusionToUpdate);
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
            <div>{`${sourceTable.name} : ${targetTable.name}`}</div>
            <div style={{ display: 'flex' }}>
                <Select
                    label="Source Column"
                    value={sourceColumn}
                    onChange={({ target: { value } }) => setSourceColumn(value)}
                >
                    {sourceTable.columns.map((col) => (
                        <MenuItem key={col.id} value={col.id}>
                            {col.name}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    label="Target Column"
                    value={targetColumn}
                    onChange={({ target: { value } }) => setTargetColumn(value)}
                >
                    {targetTable.columns.map((col) => (
                        <MenuItem key={col.id} value={col.id}>
                            {col.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ display: 'flex' }}>
                <Select
                    label="Join Type"
                    value={joinType}
                    onChange={({ target: { value } }) => setJoinType(value)}
                >
                    {keys(JOIN_TYPE).map((joinType) => (
                        <MenuItem key={joinType} value={joinType}>
                            {joinType}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={onSwitch}>Switch</Button>
            </div>
            <div>
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </Container>
    );
};

const Container = styled('div')`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export default FusionForm;
