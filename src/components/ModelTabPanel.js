import * as React from 'react';
import {
    Fab,
    styled,
} from '@mui/material'
import { TabPanel } from '@mui/lab';
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import ModelErd from './model-erd/ModelErd'




const ModelTabPanel = ({ model }) => {
    return (
        <StyledTabPanel key={model.id} value={model.id} index={model.id}>
            <ModelErd id={model.id}/>
            <BottomActionButtons>
                <Fab color="primary" aria-label="add">
                    <TableChartSharpIcon />
                </Fab>
            </BottomActionButtons>
        </StyledTabPanel>
    );
};

const StyledTabPanel = styled(TabPanel)`
    flex: 1;
`;

const BottomActionButtons = styled('div')`
    margin-top: auto;
`;

export default ModelTabPanel;
