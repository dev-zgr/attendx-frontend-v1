import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {ListWrapperComponent} from "../../../components/Wrappers/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {addParametersToURL, extractParameters, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, DATA_LIST_URL_PARAMETERS, WATERMARKS} from "../../../config/config";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {QueryManager} from "../../../components/QueryManager";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {useState} from "react";
import {PaginationManagerComponent} from "../../../components/PaginationManagerComponent";

export const EditorsPage = () => {
    const [urlParameters, setUrlParameters] = useState(DATA_LIST_URL_PARAMETERS);
    const fetchedData = useLoaderData();



    return (
        <>
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Add Editor"} to={"new"}/>
                    <SelectMetaComponent urlParameters={urlParameters} setUrlParameters={setUrlParameters}/>
                </QueryManager>
                {
                    fetchedData.data.length > 0 ?
                        <ListWrapperComponent>
                            {

                                fetchedData.data.map((editor, index) => {
                                    return <ItemCardMetaComponent
                                        watermark={getRandomElement(WATERMARKS.EDITOR)}
                                        main={`${editor.firstName} ${editor.lastName}`}
                                        description={editor.email}
                                        id={editor.email}
                                        key={index}
                                    />
                                })
                            }
                            <PaginationManagerComponent pageCount={fetchedData.pageNumber} urlParameters={urlParameters}
                                                        setUrlParameters={setUrlParameters}/>
                        </ListWrapperComponent> :
                        <h2 className={"col-start-5 col-end-8 font-semibold mt-8 mb-2 text-slate-900 text-2xl"}>No
                            Editors
                            Found!</h2>
                }
            </MainWrapperComponent>
        </>

    )
}

export async function loader({request}) {
    const extractedParameters = extractParameters(request.url);
    const firstUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const newUrl = addParametersToURL(firstUrl, extractedParameters);
    const response = await fetch(newUrl, {
        headers: {
            "Authorization": localStorage.getItem("token") || ""
        }
    });
    console.log(response.status)
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 401) {
        throw new Response(JSON.stringify({header: "You aren't allowed to be here ❌", description: "401 Unauthorized"}), {status: 401});
    }
}