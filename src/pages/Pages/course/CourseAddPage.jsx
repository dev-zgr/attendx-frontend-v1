import {convertDateFormat, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES, OPTION_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {useActionData, useNavigate} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {DateInputMetaComponent} from "../../../meta-components/form/inputs/DateInputMetaComponent";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {ErrorPage} from "../../error/ErrorPage";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const CourseAddPage = () => {
    const actionData = useActionData();
    const dispatch = useDispatch();
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);


    useEffect(() => {
        if (actionData === 201) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ADD_ACTION_201));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ADD_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ADD_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);

    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }
    return (
        <>
            {
                sessionState.isLogged && sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR ?
                    <>
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_ADD_ACTION_201 &&
                            <InfoModalComponent
                                header={"Course Added Successfully"}
                                message={"We're redirect you to courses page!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_ADD_ACTION_400 &&
                            <InfoModalComponent
                                header={"Bad Data"}
                                message={"Please check all the fields again!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_ADD_ACTION_500 &&
                            <InfoModalComponent
                                header={"Internal Server Error"}
                                message={"Course Addition failed, please try again later!"}
                                toggleModal={toggleModal}
                            />
                        }
                        <MainWrapperComponent>
                            <QueryManager>
                                <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                            </QueryManager>
                            <GenericFormManager method={"POST"}>
                                <SectionHeaderMetaComponent header={"Course"}/>
                                <SectionDescriptionMetaComponent
                                    description={"This information will be used for storing course information"}/>
                                <InputSectionMetaComponent>
                                    <TextInputMetaComponent name={"courseCode"} label={"Course Code"} placeholder={"eg. YMH212"}
                                                            size={3} validator={() => true}/>
                                    <TextInputMetaComponent name={"courseName"} label={"Course Name"}
                                                            placeholder={"eg. Advanced Programming Concepts"} size={3}
                                                            validator={(text) => textValidator(text, 60)}/>
                                    <DateInputMetaComponent
                                        name={"startDate"} label={"Start Date"} size={3} placeholder={"eg. 2021-01-01"}
                                    />
                                    <DateInputMetaComponent
                                        name={"endDate"} label={"End Date"} size={3} placeholder={"eg. 2021-05-01"}
                                    />
                                    <SelectBoxMetaComponent optionCode={OPTION_CODES.LECTURER} name={"lecturerEmail"}
                                                            label={"Lecturer"} size={3}
                                                            placeholder={"Select lecturer's department"}/>
                                    <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT} name={"departmentName"}
                                                            label={"Department"} size={3}
                                                            placeholder={"Select lecturer's department"}/>

                                    <BlobInputMetaComponent name={"description"} label={"Description"}
                                                            placeholder={"Write a brief description of the department"}
                                                            validator={(text) => textValidator(text, 255)}/>
                                </InputSectionMetaComponent>

                            </GenericFormManager>
                        </MainWrapperComponent>
                    </>
                    :
                    <ErrorPage
                        header={"You aren't allowed to be here❌"}
                        description={"404 Unauthorized"}
                    />
            }
        </>
    )
}


export async function action({request}) {
    const data = await request.formData();
    const formattedStartDate = convertDateFormat(data.get("startDate"));
    const formattedEndDate = convertDateFormat(data.get("endDate"));
    const body = {
        courseCode: data.get("courseCode"),
        courseName: data.get("courseName"),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        lecturerEmail: data.get("lecturerEmail"),
        departmentName: data.get("departmentName"),
        description: data.get("description"),
        enrolledStudents: [],
    }
    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.COURSE), {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });
    const returnedResponse = await response;
    if(returnedResponse.status === 401){
        throw new Response(JSON.stringify({header: "You aren't allowed to be here ❌", description: "401 Unauthorized"}), {status: 401});
    }
    return returnedResponse.status;
}