import { useQuery } from "@tanstack/react-query"
import { CONST } from "../config"

const useBaseQuery = (sparqlQuery: string) => {
    return useQuery({
        queryKey: [""],
        queryFn: () =>
            fetch(`${CONST.SPARQL_API_URL}?default-graph-uri=${encodeURIComponent(CONST.DEFAULT_GRAPH_URI)}&query=${encodeURIComponent(CONST.SPARQL_PREFIXES)}  ${encodeURIComponent(sparqlQuery)}&output=json`)
            .then((res) => res.json())
    });
};


export const useFetchPlayers = () => {
    return {...useBaseQuery("SELECT * WHERE {?x a dbo:VideoGame}")};
};