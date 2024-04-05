import {extractParameters, genericLoader} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, DATA_LIST_URL_PARAMETERS, WATERMARKS} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SelectMetaComponent} from "../../../meta-components/buttons/SelectMetaComponent";
import {ListWrapperComponent} from "../../../components/Wrappers/ListWrapperComponent";
import {ItemCardMetaComponent} from "../../../meta-components/cards/ItemCardMetaComponent";
import {getRandomElement} from "../../../utilityFunctions/pageLogic";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import {PaginationManagerComponent} from "../../../components/PaginationManagerComponent";

export const CoursesPage = () => {
    const [urlParameters, setUrlParameters] = useState(DATA_LIST_URL_PARAMETERS);
    const fetchedData = useLoaderData();

    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Add Course"} to={"new"}/>
                <SelectMetaComponent urlParameters={urlParameters} setUrlParameters={setUrlParameters}/>
            </QueryManager>
            {
                fetchedData.data.length > 0 ?
                    <ListWrapperComponent>
                        {
                            fetchedData.data.map((course, index) => {
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
                        <PaginationManagerComponent pageCount={fetchedData.pageNumber} urlParameters={urlParameters}
                                                    setUrlParameters={setUrlParameters}/>

                    </ListWrapperComponent> :
                    <h2 className={"col-start-5 col-end-8 font-semibold mt-8 mb-2 text-slate-900 text-2xl"}>No Courses
                        Found!</h2>
            }

        </MainWrapperComponent>
    )
}

export async function loader({request}) {
    const extractedParameters = extractParameters(request.url);
    return genericLoader(API_CONFIG.ENDPOINTS.COURSE, extractedParameters);
}