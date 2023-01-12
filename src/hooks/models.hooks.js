import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import { createModel, deleteModel, fetchModels } from '../mock-requests';

export const useModelsQuery = () => {
    const query = useQuery(QUERY_KEYS.MODELS, fetchModels);
    return query;
};

export const useCreateModelMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createModel,
        onMutate: async (newModel) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MODELS });
            const previousModels = queryClient.getQueryData([
                QUERY_KEYS.MODELS,
            ]);
            queryClient.setQueryData(QUERY_KEYS.MODELS, (old) => [
                ...old,
                newModel,
            ]);
            return { previousModels };
        },
        onError: (err, newModel, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.MODELS,
                context.previousModels
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MODELS });
        },
    });
    return mutation;
};

export const useDeleteModeMutation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteModel,
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.MODELS,
            });

            const beforeDeleted = queryClient.getQueryData(
                QUERY_KEYS.MODELS
            );

            queryClient.setQueryData(
                QUERY_KEYS.MODELS,
                (old) => old.filter((model) => model.id !== deletedId)
            );

            return { beforeDeleted };
        },
        onError: (err, deletedId, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.MODELS,
                context.beforeDeleted
            );
        },
        onSettled: (deletedId) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MODELS });
        },
    });

    return mutation;
};

export const useModelNameTooltip = () => {
    const [isModelNameTooltipOpen, setIsModelNameTooltipOpen] = useState(false);
    const openModelNameTooltip = () => setIsModelNameTooltipOpen(true);

    const closeModelNameTooltip = () => setIsModelNameTooltipOpen(false);

    return {
        isModelNameTooltipOpen,
        openModelNameTooltip,
        closeModelNameTooltip,
    };
};
