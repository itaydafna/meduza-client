import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
    TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
    COLUMN_TYPE,
    COLUMN_TYPE_ICONS,
    NUMBER_FILTER_OPERATOR_OPTIONS,
    TEXT_FILTER_OPERATOR_OPTIONS,
} from '../../../../constants/app.constants';
import { useAllModelColumns } from '../../../../hooks/tables.hooks';
import { ModelContext } from '../../../App';
import { v4 as uuidv4 } from 'uuid';

const AddFilterDialog = ({ isOpen, close, addFilter }) => {
    const modelId = useContext(ModelContext);
    const { data: allColumns } = useAllModelColumns(modelId);
    const [column, setColumn] = useState();
    const [operator, setOperator] = useState();
    const [filterValue, setFilterValue] = useState('');

    const onSubmit = () => {
        addFilter({
            id: uuidv4(),
            column,
            operator,
            value: filterValue,
        });
        onClose()
    };

    const onClose = ()=>{
        close();
        setColumn();
        setOperator();
        setFilterValue('');
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add new filter</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <StyledSelect
                        value={column}
                        onChange={(e, newValue) => setColumn(newValue)}
                        options={allColumns}
                        groupBy={(option) => option.tableName}
                        getOptionLabel={(option) => option.name}
                        renderTags={() => null}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by" />
                        )}
                        renderOption={(props, option, { selected }) => (
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                {...props}
                            >
                                {COLUMN_TYPE_ICONS[option.type]}
                                <span style={{ marginLeft: '3px' }}>
                                    {option.name}
                                </span>
                            </li>
                        )}
                    />
                    <StyledSelect
                        disabled={!column}
                        value={operator}
                        onChange={(e, newValue) => setOperator(newValue)}
                        options={
                            column?.type === COLUMN_TYPE.NUMBER
                                ? NUMBER_FILTER_OPERATOR_OPTIONS
                                : TEXT_FILTER_OPERATOR_OPTIONS
                        }
                        groupBy={(option) => option.tableName}
                        getOptionLabel={(option) => option.label}
                        renderTags={() => null}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Operator" />
                        )}
                        renderOption={(props, option, { selected }) => (
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                {...props}
                            >
                                <span style={{ marginLeft: '3px' }}>
                                    {option.label}
                                </span>
                            </li>
                        )}
                    />
                    <TextField
                        label="Value"
                        value={filterValue}
                        onChange={({ target: { value } }) =>
                            setFilterValue(value)
                        }
                    />
                </FormContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={onSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const FormContainer = styled('div')`
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 200px;
`;

const StyledSelect = styled(Autocomplete)`
    margin-bottom: 20px;
`;


export default AddFilterDialog;
