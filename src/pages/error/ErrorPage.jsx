import {InfoPageWrapperComponent} from "../../components/Wrappers/InfoPageWrapperComponent";
import {InfoPageH1MetaComponent} from "../../meta-components/InfoPage/InfoPageH1MetaComponent";
import {InfoPagePMetaComponent} from "../../meta-components/InfoPage/InfoPagePMetaComponent";
import {Link, useRouteError} from "react-router-dom";

export const ErrorPage = ({header,description,children}) => {
    const error =  useRouteError();
     header = header || "😬 Oops! Something Went Wrong";
     description = description || "An error occurred while processing your request. Please try again later.";
    if(error && error.status === 404){
        description = JSON.parse(error.data).description;
        header = JSON.parse(error.data).header;
    }else if(error && error.status === 401){
        description = JSON.parse(error.data).description;
        header = JSON.parse(error.data).header;
    }
    return (
        <InfoPageWrapperComponent>
            <InfoPageH1MetaComponent>{header}</InfoPageH1MetaComponent>
            <div className={"flex justify-center"}>
                <InfoPagePMetaComponent>
                    {description}
                </InfoPagePMetaComponent>
            </div>
            <nav>
                <ul>
                    <li className="flex-grow my-3">
                        <Link
                            to={"/"}
                            className={
                                "w-full flex items-center justify-center rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            }
                        >
                            {"Back to home Page"}
                        </Link>
                    </li>
                </ul>
            </nav>
            {children}
        </InfoPageWrapperComponent>
    )
}