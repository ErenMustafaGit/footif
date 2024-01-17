import { Outlet } from "react-router"
import { useFetchPlayers } from "../queries";

export const Layout = () => {
    const { isLoading, data } = useFetchPlayers();
    
    return (
        <>
            <div>{isLoading}</div>
            <div>{data}</div>
            <p>fff</p>
            <Outlet />
        </>
    )
}