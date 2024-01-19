import { useQuery } from "@tanstack/react-query"
import { CONST } from "../config"

const useBaseQuery = (sparqlQuery: string, enabled: boolean) => {
    return useQuery({
        enabled: enabled,
        queryKey: [""],
        queryFn: () =>
            fetch(`${CONST.SPARQL_API_URL}?default-graph-uri=${encodeURIComponent(CONST.DEFAULT_GRAPH_URI)}&query=${encodeURIComponent(CONST.SPARQL_PREFIXES)}  ${encodeURIComponent(sparqlQuery)}&output=json`)
            .then((res) => res.json())
    });
};

export const useFetchSearch = (searchTerm: string) => {
    // Insert SparQL query in the brackets pls
    return useBaseQuery("", !!searchTerm);
};

// Example of how to create a query with a SparQL request
export const useFetchVideoGames = () => {
    return useBaseQuery("SELECT * WHERE {?x a dbo:VideoGame}", true);
};
export const useFetchPlayers = () => {
    return useBaseQuery("SELECT * WHERE {?x a dbo:VideoGame}", true);
};

export const useFetchPlayerDetails = (wikiId: string) => {
    return useBaseQuery(`SELECT * WHERE {?x a dbo:SoccerPlayer.; dbo:wikiPageID ${wikiId}`, !!wikiId);
}
