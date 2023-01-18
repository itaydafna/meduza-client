import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/query-keys.constants';
import {
    getAuthProfiles,
    importModelFromDbt,
    importVendorModel,
} from '../mock-requests';
import {
    getDtrProfiles,
    loadDtrModel,
    loadDbtModel,
} from '../services/requests';

export const useImportDbtModel = ({
    modelId,
    dbtFile,
    isEnabled,
    disableDbtQuery,
}) => {
    const queryClient = useQueryClient();
    const query = useQuery(
        QUERY_KEYS.IMPORT_DBT_MODEL(modelId),
        () => loadDbtModel({ modelId, file: dbtFile }),
        {
            enabled: isEnabled,
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.TABLES(modelId));
                queryClient.invalidateQueries(QUERY_KEYS.FUSIONS(modelId));
                disableDbtQuery();
            },
            onError: () => {
                disableDbtQuery();
            },
        }
    );

    return query;
};

export const useImportVendorModel = ({
    modelId,
    isEnabled,
    userName,
    password,
    profileId,
}) => {
    const queryClient = useQueryClient();
    const query = useQuery(
        QUERY_KEYS.IMPORT_VENDOR_MODEL(modelId),
        () =>
            loadDtrModel({
                email: userName,
                password,
                profileId,
                modelId,
            }),
        {
            enabled: isEnabled,
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.TABLES(modelId));
                queryClient.invalidateQueries(QUERY_KEYS.FUSIONS(modelId));
            },
        }
    );

    return query;
};

export const useVendorProfiles = ({
    vendor,
    userName,
    password,
    isEnabled,
    disableProfilesQuery,
}) => {
    const query = useQuery(
        QUERY_KEYS.VENDOR_PROFILES(vendor, userName, password),
        () => getDtrProfiles({ email: userName, password }),
        {
            enabled: isEnabled,
            onSuccess: () => {
                // disableProfilesQuery();
            },
            onError: () => {
                // disableProfilesQuery();
            },
        }
    );

    return query;
};
