import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { isEmpty, keys } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
    AGGREGATION_FUNCTION,
    COLUMN_TYPE,
} from '../constants/entity.constants';
import { ModelContext } from './ModelTabPanel';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateTableMutation } from '../hooks/tables.hooks';

const TableDialog = ({ isOpen, handleClose, name = '', columns = [] }) => {
    const [tableName, setTableName] = useState(name);
    const [rows, setRows] = useState(isEmpty(columns) ? [] : columns);

    const modelId = useContext(ModelContext);

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
                    name: '',
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
            },
            {
                field: 'type',
                headerName: 'Column Type',
                type: 'singleSelect',
                editable: true,
                valueOptions: keys(COLUMN_TYPE),
            },
            {
                field: 'aggregationFunction',
                headerName: 'Aggregation Function',
                type: 'singleSelect',
                editable: true,
                valueOptions: keys(AGGREGATION_FUNCTION),
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
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
    return (
        <Dialog open={isOpen} onClose={handleClose} fullScreen>
            <DialogTitle>Add New Table</DialogTitle>
            <DialogContent>
                <div style={{ height: 500, width: '100%' }}>
                    <TextField
                        value={tableName}
                        label="Table Name"
                        onChange={({ target: { value } }) =>
                            setTableName(value)
                        }
                    />
                    <Button variant="contained" onClick={addNewColumn}>
                        Add New Column
                    </Button>
                    <DataGrid
                        columns={gridColumns}
                        rows={rows}
                        onCellEditCommit={onCellEdit}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAndClearForm}>Cancel</Button>
                <Button onClick={onSubmit}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TableDialog;
