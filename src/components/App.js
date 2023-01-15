import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
    ClickAwayListener,
    IconButton,
    styled,
    Tab,
    Tabs,
} from '@mui/material';
import { TabContext } from '@mui/lab';
import TabLabel from './TabLabel';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';
import ModelNameTooltip from './ModelNameTooltip';
import {
    useCreateModelMutation,
    useDeleteModeMutation,
    useModelNameTooltip,
    useModelsQuery,
} from '../hooks/models.hooks';
import ModelTabPanel from './ModelTabPanel';
import meduzaMain from '../assets/meduza-main.png';
import ModelTabs from "./ModelTabs";
import {size} from "lodash";

export default function App() {
    const { isInitialLoading, data: models } = useModelsQuery();
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
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img height={50} src={meduzaMain} alt="" style={{marginRight: 10}} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            MEDUZA
                        </Typography>

                    </div>
                </Toolbar>
            </AppBar>
            {(isInitialLoading || !activeTab) ? null : (
                <TabContext value={activeTab}>
                    <ModelTabs setActiveTab={setActiveTab}/>
                    {models.map((model) => (
                        <ModelTabPanel
                            id={model.id}
                            key={model.id}
                            model={model}
                        />
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
