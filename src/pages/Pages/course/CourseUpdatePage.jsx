import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {MODAL_CODES, OPTION_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {DateInputMetaComponent} from "../../../meta-components/form/inputs/DateInputMetaComponent";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {ErrorPage} from "../../error/ErrorPage";
import {textValidator} from "../../../utilityFunctions/validator";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const CourseUpdatePage = () => {
    const fetchedCourse = useLoaderData();
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const actionData = useActionData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);
    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_UPDATE_ACTION_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_UPDATE_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 404) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_UPDATE_ACTION_404));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_UPDATE_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);

    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }
    return (
        <>
            {
                sessionState.isLogged && (sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR || sessionState.userDetails.role === ROLE_CONSTANTS.LECTURER)
                    ?
                    <>
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_UPDATE_ACTION_202 &&
                            <InfoModalComponent
                                header={"Course Updated Successfully"}
                                message={"We're redirect you to course page!"}
                                toggleModal={toggleModal}
                            />

                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_UPDATE_ACTION_400 &&
                            <InfoModalComponent
                                header={"Bad Data"}
                                message={"Please check all the fields again!"}
                                toggleModal={toggleModal}
                            />
                        },
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_UPDATE_ACTION_404 &&
                            <InfoModalComponent
                                header={"Course Not Found"}
                                message={"Course Not Found, please try again later!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.COURSE_UPDATE_ACTION_500 &&
                            <InfoModalComponent
                                header={"Internal Server Error"}
                                message={"Course Addition failed, please try again later!"}
                                toggleModal={toggleModal}
                            />
                        }
                        <MainWrapperComponent>
                            <QueryManager>
                                <QueryManagerButton label={"Back"} to={".."}/>
                            </QueryManager>
                            <GenericFormManager method={"PUT"}>
                                <input name={"courseCode"} className={"hidden"} value={fetchedCourse.courseCode} onChange={()=>{}}/>
                                <input name={"startDate"} className={"hidden"} value={fetchedCourse.startDate} onChange={()=>{}}/>
                                <input name={"endDate"} className={"hidden"} value={fetchedCourse.endDate} onChange={()=>{}}/>

                                <SectionHeaderMetaComponent
                                    header={`Course: ${fetchedCourse.courseCode}-${fetchedCourse.courseName}`}/>
                                <InputSectionMetaComponent>
                                    <TextInputMetaComponent
                                        label={"Course Code"}
                                        size={3}
                                        value={fetchedCourse.courseCode}
                                        disabled={true}
                                    />
                                    <TextInputMetaComponent
                                        name={"courseName"}
                                        label={"Course Name"}
                                        size={3}
                                        validator={() => true}
                                        value={fetchedCourse.courseName}
                                    />
                                    <DateInputMetaComponent
                                        label={"Start Date"}
                                        size={3}
                                        value={fetchedCourse.startDate}
                                        disabled={true}
                                    />
                                    <DateInputMetaComponent
                                        label={"End Date"}
                                        size={3}
                                        value={fetchedCourse.endDate}
                                        disabled={true}
                                    />
                                    <SelectBoxMetaComponent optionCode={OPTION_CODES.LECTURER}
                                                            name={"lecturerEmail"}
                                                            label={"Lecturer"}
                                                            size={3}
                                                            defaultValue={fetchedCourse.lecturerEmail}
                                    />
                                    <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT}
                                                            name={"departmentName"}
                                                            label={"Department"}
                                                            size={3}
                                                            defaultValue={fetchedCourse.departmentName}
                                    />

                                    <BlobInputMetaComponent name={"description"}
                                                            label={"Description"}
                                                            value={fetchedCourse.description}
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