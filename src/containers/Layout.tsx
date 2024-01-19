import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

export const Layout = () => {
    return (
        <>
            <Box height={"64px"} backgroundColor={"green"}>
            </Box>

            <Container maxWidth={"80vw"}>
                <Outlet />
            </Container>
        </>
    )
}