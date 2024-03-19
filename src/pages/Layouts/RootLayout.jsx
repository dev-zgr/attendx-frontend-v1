import {HeaderComponent} from "../../components/HeaderComponent";
import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <HeaderComponent/>
                <Outlet/>

        </>
    )
}