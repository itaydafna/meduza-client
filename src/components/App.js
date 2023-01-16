import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';
import { TabContext } from '@mui/lab';
import { useState, useEffect, useRef } from 'react';
import {useCreateModelMutation, useModelsQuery} from '../hooks/models.hooks';
import ModelConfigurationMain from './model-configuration/ModelConfigurationMain';
import meduzaMain from '../assets/meduza-main.png';
import ModelTabs from './model-tabs/ModelTabs';
import {isEmpty, size} from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const ModelContext = React.createContext();

export default function App() {
    const { isInitialLoading, data: models, isLoading } = useModelsQuery();
    const { mutate: createNewModel } = useCreateModelMutation();

    useEffect(()=>{
        if(!isLoading && isEmpty(models)){
            createNewModel({name: 'Model 1', id: uuidv4()})
        }
    },[createNewModel, isLoading, models])

    const [activeTab, setActiveTab] = useState(null);
    const prevModelsSize = useRef(size(models));
    useEffect(() => {
        if (prevModelsSize.current < size(models)) {
            setActiveTab(models[models.length - 1].id);
        }
        if (prevModelsSize.current !== size(models)) {
            prevModelsSize.current = size(models);
        }
    }, [models, setActiveTab]);
    return (
        <AppContainer>
            <AppBar position="static">
                <Toolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            height={50}
                            src={meduzaMain}
                            alt=""
                            style={{ marginRight: 10 }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            fontFamily="WaterGalon"
                        >
                            MEDUZA
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            {isInitialLoading || !activeTab ? null : (
                <TabContext value={activeTab}>
                    <ModelTabs setActiveTab={setActiveTab} />
                    {models.map((model) => (
                        <ModelContext.Provider key={model.id} value={model.id}>
                            <ModelConfigurationMain />
                        </ModelContext.Provider>
                    ))}
                </TabContext>
            )}
        </AppContainer>
    );
}

const AppContainer = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
