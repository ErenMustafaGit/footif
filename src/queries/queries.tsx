import { useQuery } from "@tanstack/react-query"
import { CONST } from "../config"

const useBaseQuery = (sparqlQuery: string, enabled: boolean) => {
    return useQuery({
        enabled: enabled,
        queryKey: [""],
        queryFn: () =>
            fetch(`${CONST.SPARQL_API_URL}?query=${encodeURIComponent(sparqlQuery)}&output=json`)
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
    return useBaseQuery(`SELECT DISTINCT ?id ?name ?nationalteamname ?positionname ?datebirth ?placebirthname ?height ?number WHERE { ?player dbo:wikiPageID '${wikiId}'^^xsd:integer; dbo:wikiPageID ?id; rdfs:label ?name. OPTIONAL {?player dbp:nationalteam ?nationalteam.} OPTIONAL {?nationalteam dbo:wikiPageID ?nationalteamid; rdfs:label ?nationalteamname.} OPTIONAL {?player dbp:position ?position.} OPTIONAL {?position rdfs:label ?positionname.} OPTIONAL {?player dbo:birthDate ?datebirth.} OPTIONAL {?player dbo:birthPlace ?placebirth.} OPTIONAL {?placebirth dbp:name ?placebirthname.} OPTIONAL {?player dbo:height ?height.} OPTIONAL {?player dbp:currentnumber ?number.} FILTER (lang(?name) = 'en'). FILTER (lang(?nationalteamname) = 'en'). FILTER (lang(?positionname) = 'fr'). FILTER (lang(?placebirthname) = 'en'). FILTER(!regex(?nationalteamname, "under", "i")). } LIMIT 1';`, !!wikiId);
}
