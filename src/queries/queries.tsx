import { useQuery } from "@tanstack/react-query"
import { CONST } from "../config"

const useBaseQuery = (sparqlQuery: string) => {
    const { isLoading, data, error } = useQuery({
        queryKey: [""],
        queryFn: () =>
            fetch(encodeURIComponent(`${CONST.SPARQL_API_URL}?default-graph-uri=${CONST.DEFAULT_GRAPH_URI}&query=${CONST.SPARQL_PREFIXES}  ${sparqlQuery}&format=${CONST.RESULT_FORMAT}`))
            .then((res) => res.json())
    });

    return {
        isLoading,
        data,
        error
    };
};

export const useFetchPlayers = () => {
    const { isLoading, data, error } = useBaseQuery("SELECT * WHERE {?x a dbo:VideoGame}");

    return {
        isLoading,
        data,
        error
    }
};