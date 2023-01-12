import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
    ClickAwayListener,
    Fab,
    IconButton,
    styled,
    Tab,
    Tabs,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import TabLabel from './TabLabel';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';
import ModelNameTooltip from './ModelNameTooltip';
import {
    useCreateModelMutation, useDeleteModeMutation,
    useModelNameTooltip,
    useModelsQuery,
} from '../hooks/models.hooks';
import ModelTabPanel from './ModelTabPanel';

export default function App() {
    const {
        isLoading: isModelsLoading,
        isInitialLoading,
        data: models,
    } = useModelsQuery();
    const { mutate: createNewModel } = useCreateModelMutation();
    const {mutate: deleteModelMutation} = useDeleteModeMutation();

    const [activeTab, setActiveTab] = useState(null);
    const prevModelsState = useRef(models);

    const {
        isModelNameTooltipOpen,
        openModelNameTooltip,
        closeModelNameTooltip,
    } = useModelNameTooltip();

    const addNewModel = useCallback(
        (name) => {
            const id = `${uuidv4()}`;
            createNewModel({ id, name });
            closeModelNameTooltip();
        },
        [closeModelNameTooltip, createNewModel]
    );

    useEffect(() => {
        if (!isInitialLoading) {
            setActiveTab(models[0].id);
        }
    }, [isInitialLoading, models]);

    useEffect(() => {
        if (isModelsLoading && prevModelsState.current?.length < models?.length) {
            setActiveTab(models[models.length - 1].id);
        }
        prevModelsState.current = models;
    }, [isModelsLoading, models]);


    const curryEditModelName = (id) => (name) => {
        // setModels(
        //     models.map((model) =>
        //         model.id === id
        //             ? {
        //                   id,
        //                   name,
        //               }
        //             : model
        //     )
        // );
    };

    const deleteModel = useCallback(
        (id) => {
            const deletedIdx = models.findIndex((model) => model.id === id);
            let nextActiveTab;
            if (models[deletedIdx].id !== activeTab) {
                nextActiveTab = activeTab;
            } else if (!!models[deletedIdx + 1]) {
                nextActiveTab = models[deletedIdx + 1].id;
            } else if (!!models[deletedIdx - 1]) {
                nextActiveTab = models[deletedIdx - 1].id;
            } else {
                nextActiveTab = models[0].id;
            }

            deleteModelMutation(id);
            setActiveTab(nextActiveTab);
        },
        [activeTab, models]
    );

    return (
        <AppContainer>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        My App
                    </Typography>
                </Toolbar>
            </AppBar>
            {isInitialLoading || !activeTab ? (
                'LOADING...'
            ) : (
                <TabContext value={activeTab}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                        }}
                    >
                        <Tabs
                            value={activeTab}
                            onChange={(_, val) => setActiveTab(val)}
                            aria-label="basic tabs example"
                        >
                            {models.map((model) => (
                                <Tab
                                    key={model.id}
                                    label={
                                        <TabLabel
                                            label={model.name}
                                            onDelete={() =>
                                                deleteModel(model.id)
                                            }
                                            onEdit={curryEditModelName(
                                                model.id
                                            )}
                                        />
                                    }
                                    value={model.id}
                                />
                            ))}
                        </Tabs>
                        <ClickAwayListener onClickAway={closeModelNameTooltip}>
                            <span>
                                <ModelNameTooltip
                                    closeModelNameTooltip={
                                        closeModelNameTooltip
                                    }
                                    onSubmit={addNewModel}
                                    isModelNameTooltipOpen={
                                        isModelNameTooltipOpen
                                    }
                                    isNew={true}
                                    initialValue={`Model ${models.length + 1}`}
                                >
                                    <IconButton
                                        color="primary"
                                        aria-label="add"
                                        onClick={openModelNameTooltip}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </ModelNameTooltip>
                            </span>
                        </ClickAwayListener>
                    </Box>
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
