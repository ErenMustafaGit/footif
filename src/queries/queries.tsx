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
    `SELECT DISTINCT ?name ?thumbnail ?abstract ?nationalteamname ?nationalteamid ?positionname ?datebirth ?placebirthname ?height ?number ?currentclubid ?currentclubname GROUP_CONCAT(?clubname; SEPARATOR=",") AS ?clubsnames GROUP_CONCAT(?clubid; SEPARATOR=",") AS ?clubsids ?photo
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
      OPTIONAL {?player dbo:number ?number.}
      OPTIONAL {?player dbp:currentclub ?club. ?club dbo:wikiPageID ?currentclubid; rdfs:label ?currentclubname. FILTER (lang(?currentclubname) = "en"). FILTER(!regex(?currentclubname, "under", "i")).}
      OPTIONAL {?player dbo:team ?clubs. ?clubs dbo:wikiPageID ?clubid; rdfs:label ?clubname. FILTER (lang(?clubname) = "en"). FILTER(!regex(?clubname, "under", "i")).}
      OPTIONAL {?player dbo:thumbnail ?photo.}
      FILTER (lang(?name) = "en").
    }
    GROUP BY ?player ?name ?thumbnail ?abstract ?nationalteamname ?nationalteamid ?positionname ?number ?height ?datebirth ?placebirthname ?currentclubid ?currentclubname ?photo`
  );
};

export const useFetchWikiIdFromRessource = (ressourceName: string) => {
  console.log(
    `SELECT DISTINCT ?wikiId WHERE { dbr:${ressourceName} dbo:wikiPageID ?wikiId. }`
  );
  return useBaseQuery(
    ["useFetchWikiIdFromRessource", ressourceName],
    !!ressourceName,
    `SELECT DISTINCT ?wikiId WHERE { dbr:${ressourceName} dbo:wikiPageID ?wikiId. } LIMIT 1`
  );
  // We could add a UNION to also search for label or name
};

export const useFetchTeamDetails = (wikiId: string) => {
  return useBaseQuery(
    ["fetchTeamDetails", wikiId],
    !!wikiId,
    `SELECT DISTINCT ?name, ?abstract, ?stadiumName, ?groundName, ?dateCreation, ?thumbnail,
    ?urlThumbnailpresident, ?presidentName,
    ?urlThumbnailCoach, ?coachName,
    ?urlThumbnailManager, ?managerName,
    ?urlThumbnailCaptain, ?captainName,
    GROUP_CONCAT(?idJoueur; SEPARATOR="=") AS ?idsJoueur,
    GROUP_CONCAT(?joueurName; SEPARATOR="=") AS ?joueurNames,
    GROUP_CONCAT(distinct ?nickname; SEPARATOR="=") AS ?nicknames,
    ?leagueID, ?leagueName
  WHERE
  {
    ?club dbo:wikiPageID "${wikiId}"^^xsd:integer;
      rdfs:label ?name.
    FILTER (lang(?name) = "en")

      OPTIONAL {?club dbo:abstract ?abstract;
        dbo:thumbnail ?thumbnail.
        FILTER (lang(?abstract) = "en")}

      OPTIONAL {?club dbo:stadium ?stadium.
        ?stadium rdfs:label ?stadiumName.
        FILTER (lang(?stadiumName) = "en")}

      OPTIONAL {?club dbo:ground ?ground.
        ?ground rdfs:label ?groundName.
        FILTER (lang(?groundName) = "en")}

      OPTIONAL {?club dbp:nickname ?nickname.
        FILTER (lang(?nickname) = "en")
        FILTER (strlen(?nickname) > 0)}

OPTIONAL {?club dbo:opened ?dateCreation.}

      OPTIONAL {?club dbo:chairman ?president.
        OPTIONAL {?president rdfs:label ?presidentNameTmp;
          dbo:thumbnail ?urlThumbnailpresident.
          FILTER (lang(?presidentNameTmp) = "en")}
        BIND(IF(BOUND(?presidentNameTmp), ?presidentNameTmp, ?president) AS ?presidentName)}

      OPTIONAL {?club dbp:name ?joueur.
        OPTIONAL {?joueur rdfs:label ?joueurNameTmp;
          dbo:wikiPageID ?idJoueur;
          dbo:thumbnail ?urlThumbnailJoueur.
          FILTER (lang(?joueurNameTmp) = "en")}
        BIND(IF(BOUND(?joueurNameTmp), ?joueurNameTmp, ?joueur) AS ?joueurName)}

      OPTIONAL {?club dbo:coach ?coach.
        OPTIONAL {?coach rdfs:label ?coachNameTmp;
          dbo:thumbnail ?urlThumbnailCoach.
          FILTER (lang(?coachNameTmp) = "en")}
        BIND(IF(BOUND(?coachNameTmp), ?coachNameTmp, ?coach) AS ?coachName)}

      OPTIONAL {?club dbo:manager ?manager.
        OPTIONAL {?manager rdfs:label ?managerNameTmp;
          dbo:thumbnail ?urlThumbnailManager.
          FILTER (lang(?managerNameTmp) = "en")}
        BIND(IF(BOUND(?managerNameTmp), ?managerNameTmp, ?manager) AS ?managerName)}

      OPTIONAL {?club dbp:captain ?captain.
        OPTIONAL {?captain rdfs:label ?captainNameTmp;
          dbo:thumbnail ?urlThumbnailCaptain.
          FILTER (lang(?captainNameTmp) = "en")}
        BIND(IF(BOUND(?captainNameTmp), ?captainNameTmp, ?captain) AS ?captainName)}

      OPTIONAL {?club dbo:league ?league.
        ?league dbo:wikiPageID ?leagueID;
          rdfs:label ?leagueName.
          FILTER (lang(?leagueName) = "en").}
  }`
  );
};

export const useFetchTournamentDetails = (wikiId: string) => {
  return useBaseQuery(
    ["fetchPlayerDetails", wikiId],
    !!wikiId,
    `SELECT DISTINCT ?name, ?abstract, ?thumbnail, ?champions, ?mostappearances, ?mostsuccessfulclub, ?promotion, ?relegation, ?topgoalscorerWHERE
    {
      ?club dbo:wikiPageID "${wikiId}"^^xsd:integer;
      rdfs:label ?name.
      OPTIONAL {?club dbo:abstract ?abstract.}
      OPTIONAL {?club dbo:thumbnail ?thumbnail.}
      OPTIONAL {?club dbp:champion ?champions.}
      OPTIONAL {?club dbp:mostAppearances ?mostappearanceslink. ?mostappearanceslink rdfs:label ?mostappearances}
      OPTIONAL {?club dbp:mostSuccessfulClub ?mostsuccessfulclub.}
      OPTIONAL {?club dbp:promotion ?promotion.}
      OPTIONAL {?club dbp:relegation ?relegation.}
      OPTIONAL {?club dbp:topGoalscorer ?topgoalscorer.}
      FILTER (lang(?name) = "en").
      FILTER (lang(?abstract) = "fr").
    }
    LIMIT 1`
  );
};

export const useFetchResurrection = (wikiId: string) => {
  return useBaseQuery(
    ["fetchResurrection", wikiId],
    !!wikiId,
    `
      SELECT DISTINCT ?joueurName, ?birthDate,
      ?reincarnName, ?abstractReincarn, ?deathDate, ?urlThumbnailReincarn, count(?linksReincarn) AS ?popularity
      WHERE
      {
        ?joueur dbo:wikiPageID "${wikiId}"^^xsd:integer;
          rdfs:label ?joueurName;
          dbo:birthDate ?birthDate.
        ?reincarn dbo:deathDate ?deathDate;
          dbo:abstract ?abstractReincarn;
          dbo:thumbnail ?urlThumbnailReincarn;
          rdfs:label ?reincarnName.
        ?linksReincarn dbo:wikiPageWikiLink ?reincarn.
        FILTER (lang(?joueurName) = "en")
        FILTER (lang(?reincarnName) = "en")
        FILTER (lang(?abstractReincarn) = "en")
        FILTER (?deathDate = ?birthDate)
      }
      order by DESC(count(?linksReincarn))
    `
  );
};
