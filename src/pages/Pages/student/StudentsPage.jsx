import {addParametersToURL, extractParameters, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, WATERMARKS} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {ListWrapperComponent} from "../../../components/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {useLoaderData} from "react-router-dom";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {QueryManager} from "../../../components/QueryManager";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";

export const StudentsPage = () => {
    const fetchedStudent = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Student"} to={"new"}/>
                <SelectMetaComponent/>
            </QueryManager>
            <ListWrapperComponent>
                {
                    fetchedStudent.map((student,index) => {
                        return <ItemCardMetaComponent
                            watermark={getRandomElement(WATERMARKS.STUDENT)}
                            main={`${student.firstName} ${student.lastName}`}
                            optional={student.studentNumber}
                            description={student.email}
                            id={student.email}
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
    const firstUrl = prepareURL(API_CONFIG.ENDPOINTS.STUDENT);
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