import { useParams } from "react-router"
import { useFetchPlayerDetails } from "../../queries/queries"
import { Heading, Box, Text } from "@chakra-ui/react"

export const Player = () => {
    const { wikiId } = useParams();
    const { isLoading, data, error } = useFetchPlayerDetails(wikiId ?? "");
    const json = data?.results?.bindings[0];
    console.log(json);
    const name = json?.name?.value;
    const nationalteam = json?.nationalteamname?.value ?? "N/A";
    const positionname = json?.positionname?.value ?? "N/A";
    const birthdate = json?.datebirth?.value ?? "N/A";
    const birthplace = json?.placebirthname?.value ?? "N/A";
    const height = json?.height?.value ?? "N/A";
    const number = json?.number?.value ?? "N/A";

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '15px'}}>
            <Box id="blocgauche" style={{ flex: '35%', minWidth: '100px' }}>
                <div>PHOTO</div>
                <Box>
                    <Heading size="md">Main details</Heading>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">National: </Text><Text>{nationalteam}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Position: </Text><Text>{positionname}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Birth date: </Text><Text>{birthdate}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Birth place: </Text><Text>{birthplace}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Height: </Text><Text>{height}</Text></Box>
                    <Box display={"flex"} flexDirection={"row"}><Text fontWeight="bold">Number: </Text><Text>{number}</Text></Box>
                </Box>
            </Box>
            <Box id="blocdroit" style={{ flex:'65%', minWidth: '200px' }}>
                <Heading size="xl">{name}</Heading>
                <Text>Vestibulum in mauris ut nulla consectetur accumsan dignissim in ante. Nam ut elit sodales, laoreet mauris blandit, facilisis magna. Aenean mattis quam lacus, vel dictum nulla malesuada quis. Donec ullamcorper tellus neque, id facilisis mauris interdum a. In vestibulum porttitor scelerisque. Donec nec augue rhoncus, eleifend lectus vel, eleifend mi. Nullam volutpat ex nec erat luctus convallis. Cras justo nunc, tempor sed augue maximus, euismod tempor magna. Ut vitae turpis quis nisi aliquet ultricies eu ut nibh. Donec in sapien vel enim sagittis porttitor at a odio. Nulla vel sapien in tellus sagittis accumsan ut in neque. Aliquam commodo, nisi dignissim varius semper, augue lectus sagittis nibh, vel consequat ipsum nibh nec justo. Quisque auctor et felis eu venenatis.</Text>
                <Box id="clubs">

                </Box>
            </Box>
        </Box>
    )
}