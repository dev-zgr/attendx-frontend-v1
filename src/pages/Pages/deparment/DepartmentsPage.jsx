import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {useLoaderData} from "react-router-dom";
import {extractParameters, genericLoader} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, WATERMARKS} from "../../../config/config";
import {ListWrapperComponent} from "../../../components/ListWrapperComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";

export const DepartmentsPage = () => {
    const fetchedDepartments = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Department"} to={"new"}/>
                <SelectMetaComponent/>
            </QueryManager>
            <ListWrapperComponent>
                {
                    fetchedDepartments.map((department,index) => {
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
            </ListWrapperComponent>
        </MainWrapperComponent>
    )
}

export async function loader ({request}) {
    const extractedParameters = extractParameters(request.url);
    return genericLoader(API_CONFIG.ENDPOINTS.DEPARTMENT, extractedParameters);
}
