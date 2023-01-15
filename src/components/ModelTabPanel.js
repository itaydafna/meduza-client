import * as React from 'react';
import { Fab, styled } from '@mui/material';
import { TabPanel } from '@mui/lab';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import ModelErd from './model-erd/ModelErd';
import { useState } from 'react';
import TableDialog from './TableDialog';
import QueryBuilderDialog from "./query-builder/QueryBuilderDialog";


export const ModelContext = React.createContext();

const ModelTabPanel = ({ model }) => {
    const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
    const [isBuilderDialogOpen, setIsBuilderDialogOpen] = useState(false);
    const toggleTableDialog = () => setIsTableDialogOpen((isOpen) => !isOpen);
    const closeTableDialog = () => setIsTableDialogOpen(false);

    const toggleBuilderDialog = () => setIsBuilderDialogOpen((isOpen) => !isOpen);
    const closeBuilderDialog = () => setIsBuilderDialogOpen(false);


    return (
        <ModelContext.Provider value={model.id}>
            <StyledTabPanel key={model.id} value={model.id} index={model.id}>
                <FlexWrapper>
                    <ModelErd modelId={model.id} />
                    <BottomActionButtons>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={toggleTableDialog}
                        >
                            <TableChartSharpIcon />
                        </Fab>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={toggleBuilderDialog}
                        >
                            Create Query
                        </Fab>
                    </BottomActionButtons>
                </FlexWrapper>
                <TableDialog
                    isOpen={isTableDialogOpen}
                    handleClose={closeTableDialog}
                />
                <QueryBuilderDialog
                    isOpen={isBuilderDialogOpen}
                    handleClose={closeBuilderDialog}
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
