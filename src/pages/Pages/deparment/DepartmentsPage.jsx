import {useLoaderData} from "react-router-dom";
import {extractParameters, genericLoader} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, DATA_LIST_URL_PARAMETERS, ROLE_CONSTANTS, WATERMARKS} from "../../../config/config";
import {useState} from "react";
import {useSelector} from "react-redux";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {ListWrapperComponent} from "../../../components/Wrappers/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {PaginationManagerComponent} from "../../../components/PaginationManagerComponent";
import {ErrorPage} from "../../error/ErrorPage";

export const DepartmentsPage = () => {
    const [urlParameters, setUrlParameters] = useState(DATA_LIST_URL_PARAMETERS);
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const fetchedData = useLoaderData();
    return (
        <>
            {
                sessionState.isLogged ?
                    <MainWrapperComponent>
                        <QueryManager>
                            {
                                sessionState.isLogged && sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR &&
                                <QueryManagerButton label={"Add Department"} to={"new"}/>

                            }
                            <SelectMetaComponent urlParameters={urlParameters} setUrlParameters={setUrlParameters}/>
                        </QueryManager>
                        {
                            fetchedData.data.length > 0 ?

                                <ListWrapperComponent>
                                    {

                                        fetchedData.data.map((department, index) => {
                                            return <ItemCardMetaComponent
                                                watermark={getRandomElement(WATERMARKS.DEPARTMENT)}
                                                main={department.departmentName}
                                                description={department.description}
                                                id={department.departmentName}
                                                key={index}
                                                index={index}
                                            />
                                        })
                                    }
                                    <PaginationManagerComponent pageCount={fetchedData.pageNumber}
                                                                urlParameters={urlParameters}
                                                                setUrlParameters={setUrlParameters}/>
                                </ListWrapperComponent>
                                :
                                <h2 className={"col-start-5 col-end-8 font-semibold mt-8 mb-2 text-slate-900 text-2xl"}>No
                                    Departments
                                    Found!</h2>

                        }
                    </MainWrapperComponent>
                    : <ErrorPage
                        header={"You aren't allowed to be here❌"}
                        description={"404 Unauthorized"}
                    />
            }
        </>
    )
}

export async function loader({request}) {
    const extractedParameters = extractParameters(request.url);
    return genericLoader(API_CONFIG.ENDPOINTS.DEPARTMENT, extractedParameters);
}
