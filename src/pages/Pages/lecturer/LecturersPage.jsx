import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {ListWrapperComponent} from "../../../components/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {API_CONFIG, WATERMARKS} from "../../../config/config";
import {extractParameters, genericLoader} from "../../../utilityFunctions/apiHandling";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {QueryManager} from "../../../components/QueryManager";

export const LecturersPage = () => {
    const fetchedLecturer = useLoaderData();

    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Lecturer"} to={"new"}/>
                <SelectMetaComponent/>
            </QueryManager>
            <ListWrapperComponent>
                {
                    fetchedLecturer.map((lecturer,index) => {
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
            </ListWrapperComponent>
        </MainWrapperComponent>
    )
}

export async function loader ({request}) {
    const extractedParameters = extractParameters(request.url);
    return genericLoader(API_CONFIG.ENDPOINTS.LECTURER, extractedParameters);
}