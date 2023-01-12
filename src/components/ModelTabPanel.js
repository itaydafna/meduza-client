import * as React from 'react';
import { Fab, styled } from '@mui/material';
import { TabPanel } from '@mui/lab';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import ModelErd from './model-erd/ModelErd';
import { useCreateTableMutation } from '../hooks/tables.hooks';
import { v4 as uuidv4 } from 'uuid';

const ModelTabPanel = ({ model }) => {
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
        <StyledTabPanel key={model.id} value={model.id} index={model.id}>
            <FlexWrapper>
                <ModelErd modelId={model.id} />
                <BottomActionButtons>
                    <Fab color="primary" aria-label="add" onClick={fastCreate}>
                        <TableChartSharpIcon />
                    </Fab>
                </BottomActionButtons>
            </FlexWrapper>
        </StyledTabPanel>
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
