import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import {
    createFusion,
    fetchFusions, updateFusion,
} from '../mock-requests';

export const useFusionsQuery = (modelId) => {
    const query = useQuery(QUERY_KEYS.FUSIONS(modelId), () =>
        fetchFusions(modelId)
    );
    return query;
};

export const useFusion = (modelId, fusionId) => {
    const query = useQuery(
        QUERY_KEYS.FUSIONS(modelId),
        () => fetchFusions(modelId),
        {
            select: (fusions) =>
                fusions.find((fusion) => fusion.id === fusionId),
        }
    );
    return query;
};

export const useCreateFusionMutation = (modelId) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createFusion,
        onMutate: async (newFusion) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.FUSIONS(modelId),
            });
            const previousFusions = queryClient.getQueryData([
                QUERY_KEYS.FUSIONS(modelId),
            ]);
            queryClient.setQueryData(QUERY_KEYS.FUSIONS(modelId), (old) => [
                ...old,
                newFusion,
            ]);
            return { previousFusions };
        },
        onError: (err, newFusion, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.FUSIONS(modelId),
                context.previousFusions
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FUSIONS(modelId),
            });
        },
    });
    return mutation;
};

export const useUpdateFusionMutation = (modelId) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateFusion,
        onMutate: async (fusion) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.FUSIONS(modelId),
            });

            const previousFusions = queryClient.getQueryData(
                QUERY_KEYS.FUSIONS(modelId)
            );

            queryClient.setQueryData(QUERY_KEYS.FUSIONS(modelId), (old) =>
                old.map((t) => (t.id === fusion.id ? fusion : t))
            );

            return { previousFusions };
        },

        onError: (err, newTodo, context) => {
            queryClient.setQueryData(
                QUERY_KEYS.FUSIONS(modelId),
                context.previousFusions
            );
        },
        onSettled: (table) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FUSIONS(modelId),
            });
        },
    });


    return mutation;
};
