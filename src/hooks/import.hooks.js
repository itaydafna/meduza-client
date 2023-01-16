import {useQuery, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "../constants/query-keys.constants";
import {importModelFromDbt} from "../mock-requests";

export const useImportDbtModel = (modelId, isEnabled)=>{
    const queryClient =  useQueryClient()
    const query = useQuery(QUERY_KEYS.IMPORT_DBT_MODEL(modelId), ()=>importModelFromDbt(modelId), {
        enabled: isEnabled,
        onSuccess: ()=>{
            queryClient.invalidateQueries(QUERY_KEYS.TABLES(modelId));
            queryClient.invalidateQueries(QUERY_KEYS.FUSIONS(modelId));
        }
    })

    return query;
}
