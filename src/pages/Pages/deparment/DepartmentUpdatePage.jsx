import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ErrorPage} from "../../error/ErrorPage";
import {MODAL_CODES, ROLE_CONSTANTS} from "../../../config/config";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const DepartmentUpdatePage = () => {
    const fetchedDepartment = useLoaderData();
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const actionData = useActionData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);
    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_UPDATE_ACTION_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_UPDATE_ACTION_400));
            dispatch(UIActions.showModal());
        }else if (actionData === 404) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_UPDATE_ACTION_404));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_UPDATE_ACTION_500));
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
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_UPDATE_ACTION_202 &&
                            <InfoModalComponent
                                header={"Department Updated Successfully"}
                                message={"We're redirect you to department page!"}
                                toggleModal={toggleModal}
                            />

                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_UPDATE_ACTION_400 &&
                            <InfoModalComponent
                                header={"Bad Data"}
                                message={"Please check all the fields again!"}
                                toggleModal={toggleModal}
                            />
                        },
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_UPDATE_ACTION_404 &&
                            <InfoModalComponent
                                header={"Department Not Found"}
                                message={"Department Not Found, please try again later!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_UPDATE_ACTION_500 &&
                            <InfoModalComponent
                                header={"Internal Server Error"}
                                message={"Department Addition failed, please try again later!"}
                                toggleModal={toggleModal}
                            />
                        }
                        <MainWrapperComponent>
                        <QueryManager>
                            <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                        </QueryManager>
                        <GenericFormManager method={"PUT"}>
                            <input name={"departmentName"} className={"hidden"} value={fetchedDepartment.departmentName} onChange={() =>{}}/>
                            <SectionHeaderMetaComponent header={`Editing: ${fetchedDepartment.departmentName}`}/>
                            <SectionDescriptionMetaComponent
                                description={"You're currently editing the department. Changes will be permanent after you click save button"}/>
                            <InputSectionMetaComponent>
                                <TextInputMetaComponent
                                    name={"departmentName"}
                                    label={"Department Name"}
                                    placeholder={"eg. Department of Engineering"}
                                    size={3}
                                    value={fetchedDepartment.departmentName}
                                    validator={(text) => textValidator(text, 60)}
                                    disabled={true}
                                />
                                <BlobInputMetaComponent
                                    value={fetchedDepartment.description}
                                    name={"description"}
                                    label={"Description"}
                                    validator={(text) => textValidator(text, 255)}/>
                            </InputSectionMetaComponent>
                            <SectionDividerMetaComponent/>
                        </GenericFormManager>
                    </MainWrapperComponent>
                    </>
                    : <ErrorPage
                        header={"You aren't allowed to be here❌"}
                        description={"404 Unauthorized"}
                    />
            }
        </>
    )
}

