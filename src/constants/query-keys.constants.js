export const QUERY_KEYS = {
    MODELS: ['models'],
    TABLES: (modelId)=> ['tables',modelId],
    COLUMNS: (modelId, tableId) => ['columns', modelId, tableId],
    FUSIONS: (modelId)=>['fusions', modelId],
    CALC_COLUMNS: (modelId)=>['calcColumns', modelId]
}
