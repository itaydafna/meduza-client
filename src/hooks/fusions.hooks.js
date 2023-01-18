import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import { createFusion } from '../mock-requests';
import {useEffect, useState} from 'react';
import { isEmpty, set } from 'lodash/fp';
import {getFusions, updateFusion} from "../services/requests";

export const useFusionsQuery = (modelId) => {
    const query = useQuery(QUERY_KEYS.FUSIONS(modelId), () =>
        getFusions(modelId)
    );
    return query;
};

export const useFusion = (modelId, fusionId) => {
    const query = useQuery(
        QUERY_KEYS.FUSIONS(modelId),
        () => getFusions(modelId),
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
        mutationFn: ({modelId, fusion})=> updateFusion({modelId, join: fusion}),
        onMutate: async ({fusion}) => {
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.FUSIONS(modelId),
            });
            const previousFusions = queryClient.getQueryData([
                QUERY_KEYS.FUSIONS(modelId),
            ]);
            queryClient.setQueryData(QUERY_KEYS.FUSIONS(modelId), (old) => [
                ...old,
                fusion,
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
        mutationFn:({modelId, fusion})=> updateFusion({modelId, join: fusion}),
        onMutate: async ({fusion}) => {
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

        onError: (err, _, context) => {
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

export const useTableDependencies = (modelId) => {
    const [tableDependencies, setTableDependencies] = useState({});
    const { data: fusions } = useQuery(QUERY_KEYS.FUSIONS(modelId), () =>
        getFusions(modelId)
    );

    useEffect(()=>{
        if (!isEmpty(fusions)) {
            setTableDependencies((prevDeps) => {
                let deps = prevDeps;
                fusions.forEach(({ sourceTable, targetTable }) => {
                    deps = set([sourceTable, targetTable], true, deps);
                    deps = set([targetTable, sourceTable], true, deps);
                });
                return deps;
            });
        }
    },[fusions])


    return {tableDependencies};
};
