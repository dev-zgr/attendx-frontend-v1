import {useLoaderData} from "react-router-dom";
import {addParametersToURL, addPathVariablesToURL, apiLoader, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {MainCardWrapper} from "../../../components/MainCardWrapper";
import {SubItemCardMetaComponent} from "../../../meta-components/cards/SubItemCardMetaComponent";
import {MainGridWrapper} from "../../../meta-components/cards/MainGridWrapper";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SubItemListWrapper} from "../../../meta-components/List/SubItemListWrapper";
import {SubListListItemMetaComponent} from "../../../meta-components/List/SubListListItemMetaComponent";

export const DepartmentDetailPage = () => {
    const fetchedDepartment = useLoaderData();

    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Update Department"} to={"edit"}/>
                <QueryManagerButton label={"Back"} to={".."}/>
            </QueryManager>
            <MainCardWrapper>
                <SectionHeaderMetaComponent header={`Department: ${fetchedDepartment.departmentName}`}/>
                <InputSectionMetaComponent>
                    <TextInputMetaComponent name={"departmentName"}
                                            label={"Department Name"}
                                            size={3}
                                            value={fetchedDepartment.departmentName}
                                            validator={(text) => textValidator(text, 60)}
                                            disabled={true}
                    />
                    <BlobInputMetaComponent name={"description"}
                                            label={"Description"}
                                            validator={(text) => textValidator(text, 255)}
                                            value={fetchedDepartment.description}
                                            disabled={true}
                    />
                </InputSectionMetaComponent>
            </MainCardWrapper>
            <MainGridWrapper>
                <SubItemCardMetaComponent className={"col-start-3"}>
                    <SectionHeaderMetaComponent header={"Lecturers"}/>
                    <SectionDescriptionMetaComponent description={"Lecturers registered to this department..."}/>
                    <SubItemListWrapper>
                        {fetchedDepartment.lecturers.map((lecturer, index) => {
                            return (
                                <SubListListItemMetaComponent key={index}
                                                              to={`/lecturer/${lecturer.email}`}
                                >{`${lecturer.firstName} ${lecturer.lastName}`}</SubListListItemMetaComponent>
                            )
                        })}
                    </SubItemListWrapper>
                </SubItemCardMetaComponent>
                <SubItemCardMetaComponent>
                    <SectionHeaderMetaComponent header={"Courses"}/>
                    <SectionDescriptionMetaComponent
                        description={"Courses offered in this department..."}/>
                    <SubItemListWrapper>
                        {fetchedDepartment.offeredCourses.map((course, index) => {
                            return (
                                <SubListListItemMetaComponent key={index}
                                                              to={`/course/${course.courseCode}`}
                                >{`${course.courseCode}-${course.courseName}`}</SubListListItemMetaComponent>
                            )
                        })}
                    </SubItemListWrapper>
                </SubItemCardMetaComponent>
            </MainGridWrapper>
        </MainWrapperComponent>
    )
}

export const loader = async ({params}) => {
    const {departmentName} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.DEPARTMENT);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, departmentName);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}
