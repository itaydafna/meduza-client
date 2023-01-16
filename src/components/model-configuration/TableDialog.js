import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    styled,
    TextField,
} from '@mui/material';
import { isEmpty, keys } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
    AGGREGATION_FUNCTION,
    COLUMN_TYPE,
} from '../../constants/entity.constants';
import { ModelContext } from '../App';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateTableMutation } from '../../hooks/tables.hooks';

const TableDialog = ({ isOpen, handleClose, name = '', columns = [] }) => {
    const modelId = useContext(ModelContext);
    const [tableName, setTableName] = useState(name);
    const [rows, setRows] = useState(isEmpty(columns) ? [] : columns);

    const deleteColumn = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        []
    );

    const addNewColumn = useCallback(
        () =>
            setRows((prevRows) => [
                {
                    id: uuidv4(),
                    name: 'New Column',
                    type: COLUMN_TYPE.STRING,
                    aggregationFunction: AGGREGATION_FUNCTION.NONE,
                },
                ...prevRows,
            ]),
        []
    );

    const onCellEdit = useCallback(({ id, field, value }) => {
        setRows((prevState) =>
            prevState.map((row) =>
                row.id === id
                    ? {
                          ...row,
                          [field]: value,
                      }
                    : row
            )
        );
    }, []);

    const { mutate: createTable } = useCreateTableMutation(modelId);

    const gridColumns = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Column Name',
                type: 'string',
                editable: true,
                width: 200,
            },
            {
                field: 'type',
                headerName: 'Column Type',
                type: 'singleSelect',
                editable: true,
                valueOptions: keys(COLUMN_TYPE),
                width: 200,
            },
            {
                field: 'aggregationFunction',
                headerName: 'Aggregation Function',
                type: 'singleSelect',
                editable: true,
                valueOptions: keys(AGGREGATION_FUNCTION),
                width: 200,
            },
            {
                field: 'actions',
                type: 'actions',
                width: 50,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteColumn(params.id)}
                    />,
                ],
            },
        ],
        [deleteColumn]
    );

    const closeAndClearForm = useCallback(() => {
        handleClose();
        setRows([]);
        setTableName('');
    }, [handleClose]);

    const onSubmit = useCallback(() => {
        createTable({
            id: uuidv4(),
            name: tableName,
            modelId,
            columns: rows,
        });
        closeAndClearForm();
    }, [closeAndClearForm, createTable, modelId, rows, tableName]);

    const isSubmitDisabled = !tableName || isEmpty(rows);
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Add New Table</DialogTitle>
            <DialogContent>
                <FormContainer>
                    <StyledTextField
                        size="small"
                        value={tableName}
                        label="Table Name"
                        autoFocus
                        onChange={({ target: { value } }) =>
                            setTableName(value)
                        }
                    />
                    <StyledButton
                        size="small"
                        variant="contained"
                        onClick={addNewColumn}
                    >
                        Add New Column
                    </StyledButton>
                    <DataGrid
                        columns={gridColumns}
                        rows={rows}
                        onCellEditCommit={onCellEdit}
                        components={{
                            NoRowsOverlay: () => (
                                <Stack
                                    height="100%"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    Click above to add columns to your table
                                </Stack>
                            ),
                        }}
                    />
                </FormContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={closeAndClearForm}>Cancel</Button>
                <Button variant="contained" color={'primary'} onClick={onSubmit} disabled={isSubmitDisabled}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const FormContainer = styled('div')`
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 500px;
`;

const StyledTextField = styled(TextField)`
    width: 200px;
    margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
    width: 200px;
    margin-bottom: 10px;
`;

export default TableDialog;
