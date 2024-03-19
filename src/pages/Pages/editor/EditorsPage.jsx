import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {ListWrapperComponent} from "../../../components/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {addParametersToURL, extractParameters, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, WATERMARKS} from "../../../config/config";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {QueryManager} from "../../../components/QueryManager";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";

export const EditorsPage = () => {
    const fetchedEditors = useLoaderData();

    return (
        <MainWrapperComponent>
            <QueryManager>
            <QueryManagerButton label={"Add Editor"} to={"new"}/>
                <SelectMetaComponent/>
            </QueryManager>
            <ListWrapperComponent>
                {
                    fetchedEditors.map((editor,index) => {
                        return <ItemCardMetaComponent
                            watermark={getRandomElement(WATERMARKS.EDITOR)}
                            main={`${editor.firstName} ${editor.lastName}`}
                            description={editor.email}
                            id={editor.email}
                            key={index}
                        />
                    })
                }
            </ListWrapperComponent>
        </MainWrapperComponent>
    )
}

export async function loader ({request,params}) {
    const extractedParameters = extractParameters(request.url);
    const firstUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const newUrl = addParametersToURL(firstUrl, extractedParameters);
    const response = await fetch(newUrl);
    if (response.status === 200) {
        const responseData =  await response.json();
        return responseData;
    } else {
        const resData =  await response.json();
        return resData;
    }
}