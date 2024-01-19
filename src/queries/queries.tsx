import { useQuery } from "@tanstack/react-query"
import { CONST } from "../config"

const useBaseQuery = (queryKey: string[], enabled: boolean, sparqlQuery: string) => {
    return useQuery({
        enabled: enabled,
        retry: 1,
        queryKey: queryKey,
        queryFn: () =>
            fetch(`${CONST.SPARQL_API_URL}?query=${encodeURIComponent(sparqlQuery)}&output=json`)
            .then((res) => res.json())
    });
};

export const useFetchSearch = (searchTerm: string) => {
    // Insert SparQL query in the brackets pls
    return useBaseQuery(
        ["fetchSearch"], !!searchTerm,
        `
        SELECT DISTINCT ?playerID, ?playerName, COUNT(?linksPlayer) AS ?popularityPlayer, ?clubID, ?clubName, COUNT(?linksClub) AS ?popularityClub, ?ligueID, ?ligueName, COUNT(?linksLigue) AS ?popularityLigue
        WHERE
        {
            {
                ?player rdf:type dbo:SoccerPlayer, dbo:Person.
                ?player rdfs:label ?playerName.
                ?player dbo:wikiPageID ?playerID.
                ?linksPlayer dbo:wikiPageWikiLink ?player.
                FILTER(regex(?playerName,"${searchTerm}","i"))
                FILTER(lang(?playerName)="en")
            }
            UNION
            {
                ?club rdf:type dbo:SoccerClub, dbo:SportsClub.
                ?club rdfs:label ?clubName.
                ?club dbo:wikiPageID ?clubID.
                ?linksClub dbo:wikiPageWikiLink ?club.
                FILTER(!regex(?club, "futsal|Rugby|beach_soccer", "i"))
                FILTER(regex(?clubName,"${searchTerm}","i"))
                FILTER(lang(?clubName)="en")
            }
            UNION
            {
                ?ligue rdf:type dbo:SoccerLeague.
                ?ligue rdfs:label ?ligueName.
                ?ligue dbo:wikiPageID ?ligueID.
                ?linksPlayer dbo:wikiPageWikiLink ?ligue.
                FILTER(regex(?ligueName,"${searchTerm}","i"))
                FILTER(lang(?ligueName)="en")
            }
        }
        `
    );
};

export const useFetchPlayers = () => {
    return useBaseQuery(
        ["fetchPlayers"], true,
        "SELECT * WHERE {?x a dbo:VideoGame}"
    );
};

export const useFetchPlayerDetails = (wikiId: string) => {
    return useBaseQuery(
        ["fetchPlayerDetails"], !!wikiId,
        `SELECT DISTINCT ?id ?name ?nationalteamname ?positionname ?datebirth ?placebirthname ?height ?number WHERE { ?player dbo:wikiPageID '${wikiId}'^^xsd:integer; dbo:wikiPageID ?id; rdfs:label ?name. OPTIONAL {?player dbp:nationalteam ?nationalteam.} OPTIONAL {?nationalteam dbo:wikiPageID ?nationalteamid; rdfs:label ?nationalteamname.} OPTIONAL {?player dbp:position ?position.} OPTIONAL {?position rdfs:label ?positionname.} OPTIONAL {?player dbo:birthDate ?datebirth.} OPTIONAL {?player dbo:birthPlace ?placebirth.} OPTIONAL {?placebirth dbp:name ?placebirthname.} OPTIONAL {?player dbo:height ?height.} OPTIONAL {?player dbp:currentnumber ?number.} FILTER (lang(?name) = 'en'). FILTER (lang(?nationalteamname) = 'en'). FILTER (lang(?positionname) = 'fr'). FILTER (lang(?placebirthname) = 'en'). FILTER(!regex(?nationalteamname, "under", "i")). } LIMIT 1';`
    );
};
