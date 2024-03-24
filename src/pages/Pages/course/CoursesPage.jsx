import {extractParameters, genericLoader} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, WATERMARKS} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {ListWrapperComponent} from "../../../components/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {useLoaderData} from "react-router-dom";

export const CoursesPage = () => {
    const fetchedCourses = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Course"} to={"new"}/>
                <SelectMetaComponent/>
            </QueryManager>
            <ListWrapperComponent>
                {
                    fetchedCourses.map((course,index) => {
                        return <ItemCardMetaComponent
                            watermark={getRandomElement(WATERMARKS.COURSE)}
                            main={`${course.courseCode} - ${course.courseName}`}
                            optional={course.departmentName}
                            description={course.description}
                            id={course.courseCode}
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
    return genericLoader(API_CONFIG.ENDPOINTS.COURSE, extractedParameters);
}