import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../constants/query-keys.constants";
import {fetchModels, fetchModelTables} from "../mock-requests";

export const useTablesQuery = (modelId)=>{
    const query = useQuery(QUERY_KEYS.TABLES(modelId),()=> fetchModelTables(modelId));
    return query;
}
