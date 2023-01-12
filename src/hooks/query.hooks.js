import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../constants/query-keys.constants";
import {fetchModels} from "../mock-requests";

const useModels = ()=>{
  const query = useQuery(QUERY_KEYS.MODELS,fetchModels)
}
