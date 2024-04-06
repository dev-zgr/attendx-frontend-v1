import {GenericFormManager} from "../../../components/GenericFormManager";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {useActionData, useNavigate} from "react-router-dom";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {ErrorPage} from "../../error/ErrorPage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {QueryManager} from "../../../components/QueryManager";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const DepartmentAddPage = () => {
    const actionData = useActionData();
    const dispatch = useDispatch();
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);
    useEffect(() => {
        if (actionData === 201) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_ADD_ACTION_201));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_ADD_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.DEPARTMENT_ADD_ACTION_500));
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
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_ADD_ACTION_201 &&
                            <InfoModalComponent
                                header={"Department Added Successfully"}
                                message={"We're redirect you to department page!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_ADD_ACTION_400 &&
                            <InfoModalComponent
                                header={"Bad Data"}
                                message={"Please check all the fields again!"}
                                toggleModal={toggleModal}
                            />
                        }
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.DEPARTMENT_ADD_ACTION_500 &&
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
                            <GenericFormManager method={"POST"}>
                                <SectionHeaderMetaComponent header={"Department"}/>
                                <SectionDescriptionMetaComponent
                                    description={"This information will be displayed on the department description"}/>
                                <InputSectionMetaComponent>
                                    <TextInputMetaComponent name={"departmentName"} label={"Department Name"}
                                                            placeholder={"eg. Department of Engineering"} size={3}
                                                            validator={(text) => textValidator(text, 60)}/>
                                    <BlobInputMetaComponent name={"description"} label={"Description"}
                                                            placeholder={"Write a brief description of the department"}
                                                            validator={(text) => textValidator(text, 255)}/>
                                </InputSectionMetaComponent>
                                <SectionDividerMetaComponent/>
                            </GenericFormManager>
                        </MainWrapperComponent>
                    </> :
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
    const body = {
        departmentName: data.get("departmentName"),
        description: data.get("description")
    }

    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.DEPARTMENT), {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });
    const returnedResponse = await response;
    if(returnedResponse.status === 401){
        throw new Response(JSON.stringify({header: "You aren't allowed to be here❌", description: "401 Unauthorized"}), {status: 401});
    }
    return returnedResponse.status;
}