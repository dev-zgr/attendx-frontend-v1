import {
    addParametersToURL,
    addPathVariablesToURL,
    apiLoader,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES, OPTION_CODES, ROLE_CONSTANTS} from "../../../config/config";
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
import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {SubItemCardMetaComponent} from "../../../meta-components/cards/SubItemCardMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SubItemListWrapper} from "../../../meta-components/List/SubItemListWrapper";
import {SubListListItemMetaComponent} from "../../../meta-components/List/SubListListItemMetaComponent";
import {MainGridWrapper} from "../../../meta-components/cards/MainGridWrapper";
import {DownloadAttendanceMetaComponent} from "../../../meta-components/buttons/DownloadAttendanceMetaComponent";
import {useDispatch, useSelector} from "react-redux";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {
    QueryManagerEnrollButtonMetaComponent
} from "../../../meta-components/buttons/QueryManagerEnrollButtonMetaComponent";
import {EnrollModalComponent} from "../../../components/modals/EnrollModalComponent";

export const CourseDetailPage = () => {
    const dispatch = useDispatch();
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const UIState = useSelector(state => state.UISlice);
    const actionData = useActionData();
    const navigate = useNavigate();
    const fetchedCourse = useLoaderData();


    useEffect(() => {
        dispatch(UIActions.hideModal());
        if (actionData === 200) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ENROLL_ACTION_200));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ENROLL_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ENROLL_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);

    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }
    return (
        <MainWrapperComponent>
            <QueryManager>
                {
                    sessionState.isLogged && (sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR || sessionState.userDetails.role === ROLE_CONSTANTS.LECTURER) &&
                    <QueryManagerButton label={"Update Course"} to={"edit"}/>
                }
                {
                    sessionState.isLogged && (sessionState.userDetails.role === ROLE_CONSTANTS.STUDENT) &&
                    <QueryManagerEnrollButtonMetaComponent label={"Enroll to Course"}/>
                }
                <QueryManagerButton label={"Back"} to={".."}/>
            </QueryManager>
            <>
                {
                    UIState.showModal && UIState.opcode === MODAL_CODES.COURSE_ENROLL_ACTION_MODAL_OPEN &&
                    <EnrollModalComponent
                        header={"Are you sure you want to enroll to this Course?"}
                        message={`This action cannot be undone and will delete all the information related to editor ${fetchedCourse.courseCode + "-" + fetchedCourse.courseName}`}
                        courseCode={fetchedCourse.courseCode}
                    />

                }
                {
                    UIState.showModal && UIState.opcode === MODAL_CODES.COURSE_ENROLL_ACTION_200 &&
                    <InfoModalComponent
                        header={"You've enrolled successfully!"}
                        message={"We're redirecting you to courses page!"}
                        toggleModal={toggleModal}
                    />

                }
                {
                    UIState.showModal && UIState.opcode === MODAL_CODES.COURSE_ENROLL_ACTION_400 &&
                    <InfoModalComponent
                        header={"Bad Data"}
                        message={"You're already enrolled in this course!"}
                        toggleModal={toggleModal}
                    />
                }
                {
                    UIState.showModal && UIState.opcode === MODAL_CODES.COURSE_ENROLL_ACTION_500 &&
                    <InfoModalComponent
                        header={"Internal Server Error"}
                        message={"Editor addition failed, please try again later!"}
                        toggleModal={toggleModal}
                    />
                }
            </>
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
                                            name={"lecturerEmail"}
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
            {
                sessionState.isLogged &&
                (sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR || sessionState.userDetails.role === ROLE_CONSTANTS.LECTURER) &&
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
            }
        </MainWrapperComponent>
    )
}


export const loader = async ({params}) => {
    const {courseCode} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.COURSE);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, courseCode);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters, "Course");
}


export const action = async ({request}) => {
    const data = await request.formData();
    const preparedURL = prepareURL(API_CONFIG.ENDPOINTS.COURSE);
    const parameterAddedUrl = addParametersToURL(preparedURL, {"course-code": data.get("course-code"), "student-id": data.get("student-id")});
    const response = await fetch(parameterAddedUrl, {
        method: request.method,
        headers: {
            "Authorization": localStorage.getItem("token") || ""
        },
    });
    const returnedResponse = await response;
    if(returnedResponse.status === 401){
        throw new Response(JSON.stringify({header: "You aren't allowed to be here❌", description: "401 Unauthorized"}), {status: 401});
    }
    return returnedResponse.status;
}




