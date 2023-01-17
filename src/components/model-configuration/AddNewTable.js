import TableDialog from './TableDialog';
import { Button, Fab, styled } from '@mui/material';
import { useState } from 'react';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';

const AddNewTable = ({ isErdPage = false }) => {
    const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
    const toggleTableDialog = () => setIsTableDialogOpen((isOpen) => !isOpen);
    const closeTableDialog = () => setIsTableDialogOpen(false);

    return (
        <>
            <TableDialog
                isOpen={isTableDialogOpen}
                handleClose={closeTableDialog}
            />
            {isErdPage ? (
                <StyledFab
                    onClick={toggleTableDialog}
                    color="primary"
                    size="large"
                >
                    <GridOnRoundedIcon fontSize="large" />
                </StyledFab>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<GridOnRoundedIcon />}
                    onClick={toggleTableDialog}
                >
                    Create new Custom Model
                </Button>
            )}
        </>
    );
};

const StyledFab = styled(Fab)`
    height: 70px;
    width: 70px;
`;

export default AddNewTable;
