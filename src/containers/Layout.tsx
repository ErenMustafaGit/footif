import { router } from '../config/routes.config';
import { RouterProvider } from 'react-router-dom';
import { useFetchPlayers } from "../queries";
import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";

export const Layout = () => {
    const { isLoading, data } = useFetchPlayers();

    useEffect(() => {
        console.log(isLoading, data)
    }, [isLoading, data])
    
    return (
        <>
            <Box height={"64px"} backgroundColor={"green"}>
            </Box>

            <Container maxWidth={"80vw"}>
                <RouterProvider router={router} />
            </Container>
        </>
    )
}