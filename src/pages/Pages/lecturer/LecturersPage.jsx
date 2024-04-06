import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {ListWrapperComponent} from "../../../components/Wrappers/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {API_CONFIG, DATA_LIST_URL_PARAMETERS, WATERMARKS} from "../../../config/config";
import {
    addParametersToURL,
    apiLoader,
    extractParameters,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {QueryManager} from "../../../components/QueryManager";
import {useState} from "react";
import {PaginationManagerComponent} from "../../../components/PaginationManagerComponent";

export const LecturersPage = () => {
    const [urlParameters, setUrlParameters] = useState(DATA_LIST_URL_PARAMETERS);
    const fetchedData = useLoaderData();

    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Lecturer"} to={"new"}/>
                <SelectMetaComponent urlParameters={urlParameters} setUrlParameters={setUrlParameters}/>
            </QueryManager>
            {
                fetchedData.data.length > 0 ?
                    <ListWrapperComponent>

                        {
                            fetchedData.data.map((lecturer,index) => {
                                return <ItemCardMetaComponent
                                    watermark={getRandomElement(WATERMARKS.LECTURER)}
                                    main={`${lecturer.firstName} ${lecturer.lastName}`}
                                    optional={lecturer.department}
                                    description={lecturer.email}
                                    id={lecturer.email}
                                    key={index}
                                />
                            })
                        }
                        <PaginationManagerComponent pageCount={fetchedData.pageNumber} urlParameters={urlParameters} setUrlParameters={setUrlParameters} />

                    </ListWrapperComponent> :
                    <h2 className={"col-start-5 col-end-8 font-semibold mt-8 mb-2 text-slate-900 text-2xl"}>No
                        Lecturers
                        Found!</h2>
            }

        </MainWrapperComponent>
    )
}

export async function loader ({request}) {
    const extractedParameters = extractParameters(request.url);
    const preparedURL = prepareURL(API_CONFIG.ENDPOINTS.LECTURER);
    return apiLoader(addParametersToURL(preparedURL, extractedParameters), "Lecturer");
}