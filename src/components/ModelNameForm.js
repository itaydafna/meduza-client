import { IconButton, styled, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/CloseRounded'
import SaveIcon from '@mui/icons-material/CheckRounded'
import * as React from 'react'
import { FormEvent } from 'react'

const ModelNameForm = ({
    isNew,
    onClickDelete,
    saveName,
    initialValue,
}) => {
    const onFormSubmit = (event) => {
        event.preventDefault()
        saveName(event.currentTarget.modelName.value)
    }
    return (
        <StyledModelNameForm onSubmit={onFormSubmit}>
            <TextField
                defaultValue={initialValue}
                autoFocus
                margin="dense"
                name="modelName"
                id="modelName"
                label={`${isNew ? 'New' : 'Edit'} Model Name`}
                fullWidth
                variant="standard"
            />
            <Actions>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={onClickDelete}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="primary" type="submit">
                    <SaveIcon fontSize="inherit" />
                </IconButton>
            </Actions>
        </StyledModelNameForm>
    )
}

const StyledModelNameForm = styled('form')`
    padding: 5px;
    display: flex;
    flex-direction: column;
`

const Actions = styled('div')``

export default ModelNameForm
