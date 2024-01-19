import { useNavigate, useParams } from "react-router";
import { Image, Heading, Box, Text, Flex, Spinner } from "@chakra-ui/react";
import { useFetchTournamentDetails } from "../../queries";

export const Team = () => {
  const { wikiId } = useParams();

  //   Remplacer le code ci-dessous par le code de la page Team
  const { isLoading, data, error } = useFetchTournamentDetails(wikiId ?? "");

  if (isLoading)
    return (
      <Flex justifyContent="center" height="10rem" alignItems="center">
        <Spinner color="green" />
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
    ></Box>
  );
};
