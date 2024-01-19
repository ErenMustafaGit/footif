import { useNavigate, useParams } from "react-router"
import { useFetchTournamentDetails } from "../../queries/queries"
import { Image, Heading, Box, Text } from "@chakra-ui/react"

export const Team = () => {
    const { wikiId } = useParams();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '15px'}}>
            
        </Box>
    )
}