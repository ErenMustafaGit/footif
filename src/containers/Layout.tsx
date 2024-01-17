import { Outlet } from "react-router"
import { useFetchPlayers } from "../queries";
import { useEffect } from "react";

export const Layout = () => {
    const { isLoading, data } = useFetchPlayers();

    useEffect(() => {
        console.log(isLoading, data)
    }, [isLoading, data])
    
    return (
        <>
            <Outlet />
        </>
    )
}