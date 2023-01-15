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
import { size } from 'lodash';
import meduzaMain from '../assets/meduza-main.png';

export default function App() {
    const { isInitialLoading, data: models } = useModelsQuery();
    const { mutate: createNewModel } = useCreateModelMutation();
    const { mutate: deleteModelMutation } = useDeleteModeMutation();

    const [activeTab, setActiveTab] = useState(null);
    const prevModelsSize = useRef(size(models));

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
        if (prevModelsSize.current < size(models)) {
            setActiveTab(models[models.length - 1].id);
        }
        if (prevModelsSize.current !== size(models)) {
            prevModelsSize.current = size(models);
        }
    }, [models]);

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
        [activeTab, deleteModelMutation, models]
    );

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
