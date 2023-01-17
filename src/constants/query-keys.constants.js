export const QUERY_KEYS = {
    MODELS: ['models'],
    TABLES: (modelId) => ['tables', modelId],
    COLUMNS: (modelId, tableId) => ['columns', modelId, tableId],
    FUSIONS: (modelId) => ['fusions', modelId],
    CALC_COLUMNS: (modelId) => ['calcColumns', modelId],
    IMPORT_DBT_MODEL: (modelId) => ['dbt', modelId],
    IMPORT_VENDOR_MODEL: (modelId,profileId) => ['vendorModel',modelId, profileId],
    VENDOR_PROFILES: (vendor,userName, password) => [
        'profiles',
        vendor,
        userName,
        password,
    ],
};
