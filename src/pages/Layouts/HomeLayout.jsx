import {HeaderComponent} from "../../components/HeaderComponent";
import {Outlet} from "react-router-dom";
import {FooterComponent} from "../../components/FooterComponent";
export const HomeLayout = () => {
    return (
        <div className={"min-h-screen"}>
            <HeaderComponent fixed/>
            <Outlet/>
            <FooterComponent/>
        </div>


    )
}