import * as React from 'react';
import { Fab, styled } from '@mui/material';
import { TabPanel } from '@mui/lab';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import ModelErd from './model-erd/ModelErd';
import { useCreateTableMutation } from '../hooks/tables.hooks';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import TableDialog from './table-form/TableDialog';

export const ModelContext = React.createContext();

const ModelTabPanel = ({ model }) => {
    const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
    const toggleDialog = () => setIsTableDialogOpen((isOpen) => !isOpen);
    const closeDialog = () => setIsTableDialogOpen(false);

    const { mutate: createTable } = useCreateTableMutation(model.id);
    const fastCreate = () =>
        createTable({
            id: uuidv4(),
            name: 'Magic Table',
            modelId: model.id,
            columns: [
                {
                    name: 'fun',
                    id: uuidv4(),
                },
                {
                    name: 'Love',
                    id: uuidv4(),
                },
                {
                    name: 'freedom',
                    id: uuidv4(),
                },
            ],
        });

    return (
        <ModelContext.Provider value={model.id}>
            <StyledTabPanel key={model.id} value={model.id} index={model.id}>
                <FlexWrapper>
                    <ModelErd modelId={model.id} />
                    <BottomActionButtons>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={toggleDialog}
                        >
                            <TableChartSharpIcon />
                        </Fab>
                    </BottomActionButtons>
                </FlexWrapper>
                <TableDialog
                    isOpen={isTableDialogOpen}
                    handleClose={closeDialog}
                />
            </StyledTabPanel>
        </ModelContext.Provider>
    );
};

const StyledTabPanel = styled(TabPanel)`
    flex: 1;
    box-sizing: border-box;
`;

const FlexWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const BottomActionButtons = styled('div')`
    margin-top: auto;
`;

export default ModelTabPanel;
