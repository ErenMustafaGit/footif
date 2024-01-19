import { useNavigate, useParams } from "react-router"
import { useFetchTournamentDetails } from "../../queries/queries"
import { Image, Heading, Box, Text } from "@chakra-ui/react"

export const Tournament = () => {
    const { wikiId } = useParams();
    const { isLoading, data, error } = useFetchTournamentDetails(wikiId ?? "");
    const json = data?.results?.bindings[0];
    const name = json?.name?.value ?? "N/A";
    const abstract = json?.abstract?.value ?? "N/A";
    const thumbnail = json?.thumbnail?.value ?? "N/A";
    const champions = json?.champions?.value ?? "N/A";
    const mostappearances = json?.mostappearances?.value ?? "N/A";
    const mostsuccessfulclub = json?.mostsuccessfulclub?.value ?? "N/A";
    const promotion = json?.promotion?.value ?? "N/A";
    const relegation = json?.relegation?.value ?? "N/A";
    const topgoalscorer = json?.topgoalscorer?.value ?? "N/A";

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '15px'}}>
            <Box id="blocgauche" style={{ flex: '35%', minWidth: '100px' }}>
                <Image src={thumbnail}></Image>
                <Box>
                    <Heading size="md">Main details</Heading>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Champions: </Text><Text>{champions}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Most appearances: </Text><Text>{mostappearances}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Most successful club: </Text><Text>{mostsuccessfulclub}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Promotion: </Text><Text>{promotion}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Relegation: </Text><Text>{relegation}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Top goalscorer: </Text><Text>{topgoalscorer}</Text></Box>
                </Box>
            </Box>
            <Box id="blocdroit" style={{ flex:'65%', minWidth: '200px' }}>
                <Heading size="xl">{name}</Heading>
                <Text>{abstract}</Text>
                <Box id="clubs">

                </Box>
            </Box>
        </Box>
    )
}