import {HeaderComponent} from "../../components/HeaderComponent";
import {Outlet} from "react-router-dom";
import {FooterComponent} from "../../components/FooterComponent";

export const RootLayout = () => {
    return (
        <div className={"min-h-screen"}>
            <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>


    )
}
// className="flex flex-col min-h-screen"