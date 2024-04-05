import {addParametersToURL, addPathVariablesToURL, apiLoader, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, OPTION_CODES} from "../../../config/config";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {DateInputMetaComponent} from "../../../meta-components/form/inputs/DateInputMetaComponent";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {MainCardWrapper} from "../../../components/Wrappers/MainCardWrapper";
import {useLoaderData} from "react-router-dom";
import {SubItemCardMetaComponent} from "../../../meta-components/cards/SubItemCardMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SubItemListWrapper} from "../../../meta-components/List/SubItemListWrapper";
import {SubListListItemMetaComponent} from "../../../meta-components/List/SubListListItemMetaComponent";
import {MainGridWrapper} from "../../../meta-components/cards/MainGridWrapper";
import {DownloadAttendanceMetaComponent} from "../../../meta-components/buttons/DownloadAttendanceMetaComponent";

export const CourseDetailPage = () => {
    const fetchedCourse = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Update Course"} to={"edit"}/>
                <QueryManagerButton label={"Back"} to={".."}/>
            </QueryManager>
            <MainCardWrapper>
                <SectionHeaderMetaComponent header={`Course: ${fetchedCourse.courseCode}-${fetchedCourse.courseName}`}/>
                <InputSectionMetaComponent>
                    <TextInputMetaComponent
                        label={"Course Code"}
                        size={3}
                        value={fetchedCourse.courseCode}
                        disabled={true}
                    />
                    <TextInputMetaComponent
                        label={"Course Name"}
                        size={3}
                        value={fetchedCourse.courseName}
                        disabled={true}
                    />
                    <DateInputMetaComponent
                        name={"startDate"}
                        label={"Start Date"}
                        size={3}
                        value={fetchedCourse.startDate}
                        disabled={true}
                    />
                    <DateInputMetaComponent
                        name={"endDate"}
                        label={"End Date"}
                        size={3}
                        value={fetchedCourse.endDate}
                        disabled={true}
                    />
                    <SelectBoxMetaComponent optionCode={OPTION_CODES.LECTURER}
                                            name={"studentEmail"}
                                            label={"Lecturer"}
                                            size={3}
                                            value={fetchedCourse.studentEmail}
                                            disabled={true}
                    />
                    <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT}
                                            name={"departmentName"}
                                            label={"Department"}
                                            size={3}
                                            value={fetchedCourse.departmentName}
                                            disabled={true}
                    />

                    <BlobInputMetaComponent name={"description"}
                                            label={"Description"}
                                            value={fetchedCourse.description}
                                            disabled={true}
                    />
                </InputSectionMetaComponent>

            </MainCardWrapper>
            <MainGridWrapper>
                <SubItemCardMetaComponent className={"col-start-3"}>
                    <SectionHeaderMetaComponent header={"Students"}/>
                    {fetchedCourse.enrolledStudents.length === 0 ?
                        <SectionDescriptionMetaComponent
                            description={"Students hasn't enrolled to this course yet..."}/>
                        :
                        <>
                            <SectionDescriptionMetaComponent description={"Students enrolled in this course..."}/>
                            <SubItemListWrapper>
                                {fetchedCourse.enrolledStudents.map((student, index) => {
                                    return (
                                        <SubListListItemMetaComponent key={index}
                                                                      to={`/student/${student.email}`}
                                        >{`${student.studentNumber} - ${student.firstName} ${student.lastName}`}</SubListListItemMetaComponent>
                                    )
                                })}
                            </SubItemListWrapper>
                        </>

                    }

                </SubItemCardMetaComponent>

                <SubItemCardMetaComponent>
                    <SectionHeaderMetaComponent header={"Sessions"}/>
                    {
                        fetchedCourse.courseSessions.length === 0 ?
                            <SectionDescriptionMetaComponent description={"No session in this course yet..."}/>
                            :
                            <>
                                <SectionDescriptionMetaComponent description={"Sessions exists this course..."}/>
                                <SubItemListWrapper>
                                    {
                                        fetchedCourse.courseSessions.map((session, index) => {
                                            return (
                                                <DownloadAttendanceMetaComponent key={index}
                                                                              url={`/session/${session.sessionId}`}
                                                >{`${index + 1} - ${session.sessionDate}`}</DownloadAttendanceMetaComponent>
                                            )
                                        })
                                    }
                                </SubItemListWrapper>
                            </>
                    }
                </SubItemCardMetaComponent>
            </MainGridWrapper>
        </MainWrapperComponent>
    )
}


export const loader = async ({params}) => {
    const {courseCode} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.COURSE);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, courseCode);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}





