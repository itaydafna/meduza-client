import * as React from 'react';
import { styled } from '@mui/material';
import { TabPanel } from '@mui/lab';
import ModelErd from './model-erd/ModelErd';
import { useContext } from 'react';
import { ModelContext } from '../App';
import { isEmpty } from 'lodash';
import { useTablesQuery } from '../../hooks/tables.hooks';
import { useFusionsQuery } from '../../hooks/fusions.hooks';
import NewModelLandingPage from './NewModelLandingPage';

const ModelConfigurationMain = () => {
    const modelId = useContext(ModelContext);
    const { data: tables, isLoading: isTablesLoading } =
        useTablesQuery(modelId);

    const { isLoading: isFusionsLoading } = useFusionsQuery(modelId);

    return (
        <StyledTabPanel key={modelId} value={modelId} index={modelId}>
            {isTablesLoading || isFusionsLoading ? (
                'Tables Loading'
            ) : isEmpty(tables) ? (
                <NewModelLandingPage />
            ) : (
                <ModelErd />
            )}
        </StyledTabPanel>
    );
};

const StyledTabPanel = styled(TabPanel)`
    flex: 1;
    box-sizing: border-box;
`;

export default ModelConfigurationMain;
