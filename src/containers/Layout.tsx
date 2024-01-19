import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Topbar } from "../components/Topbar";

export const Layout = () => {
  return (
    <>
      <Topbar />

      <Container maxWidth={"64rem"}>
        <Outlet />
      </Container>
    </>
  );
};
