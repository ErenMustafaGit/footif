import { Box } from "@chakra-ui/react"
import { Card, Searchbar } from "../../components"

export const Home = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="32px"
            padding="32px"
            width="100%"
        >
            <Searchbar
                placeholder="Recherchez un joueur, un club, ..."
                width="60%"
            />

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="16px"
                width="100%"
            >
                <Card
                    title="Lionel Messi"
                    subtitle="Joueur"
                    type="player"
                    wikiId="2150841"
                    width="100%"
                />

                <Card
                    title="FC Barcelone"
                    subtitle="Club"
                    type="team"
                    wikiId="68187"
                    width="100%"
                />
            </Box>
        </Box>
    )
}