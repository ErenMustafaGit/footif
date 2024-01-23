import { useParams } from "react-router";
import {
  useFetchTournamentDetails,
  useFetchWikiIdFromRessource,
} from "../../queries/queries";
import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "../../components";
import { getWikipediaThumbnail } from "../../utils";
import { Image } from "../../components/Image";
import { Player } from "@lottiefiles/react-lottie-player";

export const Tournament = () => {
  const { wikiId } = useParams();
  const { isLoading, data, error } = useFetchTournamentDetails(wikiId ?? "");
  const json = data?.results?.bindings[0];
  const name = json?.name?.value ?? "N/A";
  const abstract = json?.abstract?.value ?? "N/A";
  const thumbnail = json?.thumbnail ? getWikipediaThumbnail(json) : "";
  const champions = json?.champions?.value ?? "N/A";
  const mostappearances = json?.mostappearances?.value ?? "N/A";
  var mostsuccessfulclub = json?.mostsuccessfulclub?.value ?? "N/A";
  if (mostsuccessfulclub.startsWith("http"))
    mostsuccessfulclub = mostsuccessfulclub.split("/").pop();
  const mostSuccessfulClubId =
    useFetchWikiIdFromRessource(mostsuccessfulclub).data?.results?.bindings[0]
      .wikiId?.value ?? "N/A";
  mostsuccessfulclub = mostsuccessfulclub.replace("_", " ");
  var promotion = json?.promotion?.value ?? "N/A";
  if (promotion.startsWith("http")) promotion = promotion.split("/").pop();
  const promotionId =
    useFetchWikiIdFromRessource(promotion).data?.results?.bindings[0].wikiId
      ?.value ?? "N/A";
  promotion = promotion.replace("_", " ");
  var relegation = json?.relegation?.value ?? "N/A";
  if (relegation.startsWith("http")) relegation = relegation.split("/").pop();
  const relegationId =
    useFetchWikiIdFromRessource(relegation).data?.results?.bindings[0].wikiId
      ?.value ?? "N/A";
  relegation = relegation.replace("_", " ");
  var topgoalscorer = json?.topgoalscorer?.value ?? "N/A";
  if (topgoalscorer.startsWith("http"))
    topgoalscorer = topgoalscorer.split("/").pop();
  const topgoalscorerId =
    useFetchWikiIdFromRessource(topgoalscorer).data?.results?.bindings[0].wikiId
      ?.value ?? "N/A";
  topgoalscorer = topgoalscorer.replace("_", " ");

  if (isLoading)
    return (
      <Flex
        justifyContent="center"
        height="10rem"
        alignItems="center"
        paddingTop="10rem"
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/9e33836c-8565-4a36-92ac-97edb60d5a3e/Zw0nNwzkuz.json"
          style={{ height: "300px", width: "300px" }}
        ></Player>
      </Flex>
    );
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "15px",
      }}
    >
      <Box id="blocgauche" style={{ flex: "35%", minWidth: "100px" }}>
        <Image rounded={4} src={thumbnail}></Image>
        <Box>
          <Box id="champions">
            <Heading size="md">Champions</Heading>
            <Text>{champions}</Text>
          </Box>
          <Box id="mostappearances">
            <Heading size="md">Most appearances</Heading>
            <Text>{mostappearances}</Text>
          </Box>
          <Box id="mostsuccessfulclub">
            <Heading size="md">Most successful club</Heading>
            {mostSuccessfulClubId === "N/A" ? (
              <Text>{mostsuccessfulclub}</Text>
            ) : (
              <Link href={`/team/${mostSuccessfulClubId}`}>
                {mostsuccessfulclub}
              </Link>
            )}
          </Box>
          <Box id="promotion">
            <Heading size="md">Promotion</Heading>
            {promotionId === "N/A" ? (
              <Text>{promotion}</Text>
            ) : (
              <Link href={`/tournament/${promotionId}`}>{promotion}</Link>
            )}
          </Box>
          <Box id="relegation">
            <Heading size="md">Relegation</Heading>
            {relegationId === "N/A" ? (
              <Text>{relegation}</Text>
            ) : (
              <Link href={`/tournament/${relegationId}`}>{relegation}</Link>
            )}
          </Box>
          <Box id="topgoalscorer">
            <Heading size="md">Top goalscorer</Heading>
            {topgoalscorerId === "N/A" ? (
              <Text>{topgoalscorer}</Text>
            ) : (
              <Link href={`/player/${topgoalscorerId}`}>{topgoalscorer}</Link>
            )}
          </Box>
        </Box>
      </Box>
      <Box id="blocdroit" style={{ flex: "65%", minWidth: "200px" }}>
        <Heading size="xl">{name}</Heading>
        <Text>{abstract}</Text>
        <Box id="clubs"></Box>
      </Box>
    </Box>
  );
};
