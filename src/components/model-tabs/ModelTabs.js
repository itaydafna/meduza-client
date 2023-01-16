import { ClickAwayListener, IconButton, Tab, Tabs } from '@mui/material';
import TabLabel from './TabLabel';
import ModelNameTooltip from './ModelNameTooltip';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import * as React from 'react';
import {
    useCreateModelMutation,
    useDeleteModeMutation,
    useModelNameTooltip,
    useModelsQuery,
} from '../../hooks/models.hooks';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTabContext } from '@mui/lab';

const ModelTabs = ({ setActiveTab }) => {
    const { value: activeTab } = useTabContext();
    const { data: models } = useModelsQuery();

    const {
        isModelNameTooltipOpen,
        openModelNameTooltip,
        closeModelNameTooltip,
    } = useModelNameTooltip();

    const { mutate: createNewModel } = useCreateModelMutation();
    const { mutate: deleteModelMutation } = useDeleteModeMutation();

    const addNewModel = useCallback(
        (name) => {
            const id = `${uuidv4()}`;
            createNewModel({ id, name });
            closeModelNameTooltip();
        },
        [closeModelNameTooltip, createNewModel]
    );

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

    return (
        <Box
            sx={{
                top: 60,
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
                                onDelete={() => deleteModel(model.id)}
                                onEdit={curryEditModelName(model.id)}
                            />
                        }
                        value={model.id}
                    />
                ))}
            </Tabs>
            <ClickAwayListener onClickAway={closeModelNameTooltip}>
                <span>
                    <ModelNameTooltip
                        closeModelNameTooltip={closeModelNameTooltip}
                        onSubmit={addNewModel}
                        isModelNameTooltipOpen={isModelNameTooltipOpen}
                        initialValue={`Model ${models.length + 1}`}
                        isNew
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
    );
};

export default ModelTabs;
