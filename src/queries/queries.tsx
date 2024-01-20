import { useQuery } from "@tanstack/react-query";
import { CONST } from "../config";
import { getRegexSearch } from "../utils";

const useBaseQuery = (
  queryKey: string[],
  enabled: boolean,
  sparqlQuery: string
) => {
  return useQuery({
    enabled: enabled,
    retry: 1,
    queryKey: queryKey,
    queryFn: () =>
      fetch(
        `${CONST.SPARQL_API_URL}?query=${encodeURIComponent(
          sparqlQuery
        )}&output=json`
      ).then((res) => res.json()),
  });
};

export const useFetchSearch = (searchTerm: string) => {
  // Permutation of the search term (ex: "Lionel Messi" => "Messi Lionel")
  const regexSearch = getRegexSearch(searchTerm);
  // Insert SparQL query in the brackets pls
  return useBaseQuery(
    ["fetchSearch", searchTerm],
    !!searchTerm,
    `
      SELECT DISTINCT ?imgPlayer, ?imgClub, ?imgLigue, ?playerID, ?playerName, COUNT(?linksPlayer) AS ?popularityPlayer, ?clubID, ?clubName, COUNT(?linksClub) AS ?popularityClub, ?ligue, ?ligueID, ?ligueName, COUNT(?linksLigue) AS ?popularityLigue
      WHERE
        {
            {
                ?player rdf:type dbo:SoccerPlayer, dbo:Person.
                ?player rdfs:label ?playerName.
                ?player dbo:wikiPageID ?playerID.
                ?linksPlayer dbo:wikiPageWikiLink ?player.
                ?player dbo:thumbnail ?imgPlayer.
                FILTER(regex(?playerName,"${regexSearch}","i"))
                FILTER(lang(?playerName)="en")
            }
            UNION
            {
                ?club rdf:type dbo:SoccerClub, dbo:SportsClub.
                ?club rdfs:label ?clubName.
                ?club dbo:wikiPageID ?clubID.
                ?linksClub dbo:wikiPageWikiLink ?club.
                ?club dbo:thumbnail ?imgClub.
                FILTER(!regex(?club, "futsal|Rugby|beach_soccer", "i"))
                FILTER(regex(?clubName,"${regexSearch}","i"))
                FILTER(lang(?clubName)="en")
            }
            UNION
            {
                ?ligue rdf:type dbo:SoccerLeague.
                ?ligue rdfs:label ?ligueName.
                ?ligue dbo:wikiPageID ?ligueID.
                ?ligue dbo:thumbnail ?imgLigue.
                ?linksPlayer dbo:wikiPageWikiLink ?ligue.
                FILTER(regex(?ligueName,"${regexSearch}","i"))
                FILTER(lang(?ligueName)="en")
            }
        }
        `
  );
};

export const useFetchPlayers = () => {
  return useBaseQuery(
    ["fetchPlayers"],
    true,
    "SELECT * WHERE {?x a dbo:VideoGame}"
  );
};

export const useFetchPlayerDetails = (wikiId: string) => {
  return useBaseQuery(
    ["fetchPlayerDetails", wikiId],
    !!wikiId,
    `SELECT DISTINCT ?name ?thumbnail ?abstract ?nationalteamname ?positionname ?datebirth ?placebirthname ?height ?number ?currentclubid ?currentclubname GROUP_CONCAT(?clubname; SEPARATOR=",") AS ?clubsnames GROUP_CONCAT(?clubid; SEPARATOR=",") AS ?clubsids ?photo
    WHERE
    {
      ?player dbo:wikiPageID "${wikiId}"^^xsd:integer;
      rdfs:label ?name.
      OPTIONAL {?player dbo:thumbnail ?thumbnail.}
      OPTIONAL {?player dbo:abstract ?abstract. FILTER (lang(?abstract) = "fr").}
      OPTIONAL {?player dbp:nationalteam ?nationalteam. ?nationalteam dbo:wikiPageID ?nationalteamid; rdfs:label ?nationalteamname. FILTER (lang(?nationalteamname) = "en"). FILTER(!regex(?nationalteamname, "under", "i")).}
      OPTIONAL {?player dbp:position ?position. ?position rdfs:label ?positionname. FILTER (lang(?positionname) = "fr").}
      OPTIONAL {?player dbo:birthDate ?datebirth.}
      OPTIONAL {?player dbo:birthPlace ?placebirth. ?placebirth dbp:name ?placebirthname. FILTER (lang(?placebirthname) = "en").}
      OPTIONAL {?player dbo:height ?height.}
      OPTIONAL {?player dbp:currentnumber ?number.}
      OPTIONAL {?player dbp:currentclub ?club. ?club dbo:wikiPageID ?currentclubid; rdfs:label ?currentclubname. FILTER (lang(?currentclubname) = "en"). FILTER(!regex(?currentclubname, "under", "i")).}
      OPTIONAL {?player dbo:team ?clubs. ?clubs dbo:wikiPageID ?clubid; rdfs:label ?clubname. FILTER (lang(?clubname) = "en"). FILTER(!regex(?clubname, "under", "i")).}
      OPTIONAL {?player dbo:thumbnail ?photo.}
      FILTER (lang(?name) = "en").
    }
    GROUP BY ?player ?name ?thumbnail ?abstract ?nationalteamname ?positionname ?number ?height ?datebirth ?placebirthname ?currentclubid ?currentclubname ?photo`
  );
};

export const useFetchTeamDetails = (wikiId: string) => {
  return useBaseQuery(
    ["fetchTeamrDetails"],
    !!wikiId,
    `SELECT DISTINCT ?name, ?abstract, ?coach, ?manager, ?stadiumName, ?groundName, ?captain, ?joueurName, ?nickname, ?dateCreation, ?leagueID, ?leagueName, ?president
    WHERE
    {
      ?club dbo:wikiPageID "${wikiId}"^^xsd:integer;
        rdfs:label ?name.
        OPTIONAL {?club dbo:abstract ?abstract.
          FILTER (lang(?abstract) = "fr").}
        OPTIONAL {?club dbo:coach ?coach.}
        OPTIONAL {?club dbo:manager ?manager.}
        OPTIONAL {?club dbo:stadium ?stadium.
          ?stadium rdfs:label ?stadiumName.
          FILTER (lang(?stadiumName) = "en").}
        OPTIONAL {?club dbo:ground ?ground.
          ?ground rdfs:label ?groundName.
          FILTER (lang(?groundName) = "en").}
        OPTIONAL {?club dbp:captain ?captain.}
        OPTIONAL {?club dbp:name ?joueur.
          OPTIONAL {?joueur rdfs:label ?joueurNameTmp.
            FILTER (lang(?joueurNameTmp) = "en")}
          BIND(IF(BOUND(?joueurNameTmp), ?joueurNameTmp, ?joueur) AS ?joueurName)}
        OPTIONAL {?club dbp:nickname ?nickname.
          FILTER (lang(?nickname) = "en").
          FILTER (strlen(?nickname) > 0).}
        OPTIONAL {?club dbo:opened ?dateCreation.}
        OPTIONAL {?club dbo:league ?league.
          ?league dbo:wikiPageID ?leagueID;
            rdfs:label ?leagueName.
            FILTER (lang(?leagueName) = "en").}
        OPTIONAL {?club dbo:chairman ?president.}
      FILTER (lang(?name) = "en").
    }`
  );
};

export const useFetchTournamentDetails = (wikiId: string) => {
  return useBaseQuery(
    ["fetchPlayerDetails"],
    !!wikiId,
    `SELECT DISTINCT ?id ?name ?nationalteamname ?positionname ?datebirth ?placebirthname ?height ?number WHERE { ?player dbo:wikiPageID '${wikiId}'^^xsd:integer; dbo:wikiPageID ?id; rdfs:label ?name. OPTIONAL {?player dbp:nationalteam ?nationalteam.} OPTIONAL {?nationalteam dbo:wikiPageID ?nationalteamid; rdfs:label ?nationalteamname.} OPTIONAL {?player dbp:position ?position.} OPTIONAL {?position rdfs:label ?positionname.} OPTIONAL {?player dbo:birthDate ?datebirth.} OPTIONAL {?player dbo:birthPlace ?placebirth.} OPTIONAL {?placebirth dbp:name ?placebirthname.} OPTIONAL {?player dbo:height ?height.} OPTIONAL {?player dbp:currentnumber ?number.} FILTER (lang(?name) = 'en'). FILTER (lang(?nationalteamname) = 'en'). FILTER (lang(?positionname) = 'fr'). FILTER (lang(?placebirthname) = 'en'). FILTER(!regex(?nationalteamname, "under", "i")). } LIMIT 1';`
  );
};
