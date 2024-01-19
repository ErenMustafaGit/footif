import { Box, Spinner } from "@chakra-ui/react"
import { Card, Searchbar } from "../../components"
import { useEffect, useState } from "react"
import { useFetchSearch } from "../../queries"

export const Home = () => {
    const [search, setSearch] = useState<string>("");
    const { isLoading, data, error } = useFetchSearch(search);

    const handleSubmitSearch = (val: string) => {
        setSearch(val);
    };

    useEffect(() => {
        console.log(search);
    }, [search]);

    useEffect(() => {
        console.log(data);
    }, [data]);

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
                onSubmit={handleSubmitSearch}
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
                {data ? (
                    <>
                        {/** TODO: map query results (data) */}
                    </>
                ) : (
                    <>
                        {isLoading ? (
                            <Spinner />)
                        : (
                            <>
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
                                </>
                            )
                        }
                    </>
                )}
            </Box>
        </Box>
    )
}