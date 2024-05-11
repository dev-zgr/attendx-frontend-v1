import {
    addParametersToURL,
    addPathVariablesToURL,
    apiLoader,
    deleteHandler,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {QueryManager} from "../../../components/QueryManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {MainCardWrapper} from "../../../components/Wrappers/MainCardWrapper";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {
    QueryManagerDeleteButtonMetaComponent
} from "../../../meta-components/buttons/QueryManagerDeleteButtonMetaComponent";
import {useEffect} from "react";
import {DeleteModalComponent} from "../../../components/modals/DeleteModalComponent";
import {useDispatch, useSelector} from "react-redux";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";
import {ErrorPage} from "../../error/ErrorPage";

export const EditorDetailPage = () => {
    const fetchedEditor = useLoaderData();
    const actionData = useActionData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);
    const sessionState = useSelector(state => state.accountDetailsSlice);

    const closeModal = () => {
        dispatch(UIActions.hideModal());
    }

    const openModal = () => {
        dispatch(UIActions.setOpcode(MODAL_CODES.EDITOR_DELETE_CONFIRMATION));
        dispatch(UIActions.showModal());
    }

    const toggleModal = () => {
        dispatch(UIActions.hideModal());
        navigate("..")
    }

    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.EDITOR_DELETE_ACTION_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 404) {
            dispatch(UIActions.setOpcode(MODAL_CODES.EDITOR_DELETE_ACTION_404));
            dispatch(UIActions.showModal());
        }else if (actionData === 417) {
            dispatch(UIActions.setOpcode(MODAL_CODES.EDITOR_DELETE_ACTION_417));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.EDITOR_DELETE_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);
    return (
        <>

            {
                sessionState.isLogged && sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR ?
                    <>
                        {
                            UISlice.showModal && UISlice.opcode === MODAL_CODES.EDITOR_DELETE_CONFIRMATION &&
                            <DeleteModalComponent
                                header={"Are you sure you want to delete this Editor?"}
                                message={`This action cannot be undone and will delete all the information related to editor ${fetchedEditor.firstName + " " + fetchedEditor.lastName}`}
                                toggleModal={closeModal}
                            />

                        }
                        {UISlice.showModal && UISlice.opcode === MODAL_CODES.EDITOR_DELETE_ACTION_202 &&
                            <InfoModalComponent
                                header={"Editor deleted Successfully"}
                                message={"You'll be redirected to the editor page shortly."}
                                toggleModal={toggleModal}
                            />
                        }
                        {UISlice.showModal && UISlice.opcode === MODAL_CODES.EDITOR_DELETE_ACTION_404 &&
                            <InfoModalComponent
                                header={"Editor Not Found"}
                                message={"The editor you are trying to update could not be found. Please try again later."}
                                toggleModal={toggleModal}
                            />
                        }
                        {UISlice.showModal && UISlice.opcode === MODAL_CODES.EDITOR_DELETE_ACTION_417 &&
                            <InfoModalComponent
                                header={"Expectation Failed"}
                                message={"Editor couldn't deleted please try again later."}
                                toggleModal={toggleModal}
                            />
                        }
                        {UISlice.showModal && UISlice.opcode === MODAL_CODES.EDITOR_DELETE_ACTION_500 &&
                            <InfoModalComponent
                                header={"Internal Server Error"}
                                message={"Failed to update editor due to server error. Please try again later."}
                                toggleModal={toggleModal}
                            />
                        }
                        <MainWrapperComponent>
                            <QueryManager>
                                <QueryManagerButton label={"Update Editor"} to={"edit"}/>
                                <QueryManagerDeleteButtonMetaComponent label={"Delete Editor"} setModal={openModal}/>
                                <QueryManagerButton label={"Back"} to={".."}/>
                            </QueryManager>
                            {
                                fetchedEditor &&
                                <MainCardWrapper>
                                    <SectionHeaderMetaComponent
                                        header={`Editor: ${fetchedEditor.firstName}  ${fetchedEditor.lastName}`}/>
                                    <InputSectionMetaComponent>
                                        <TextInputMetaComponent name={"firstName"}
                                                                label={"First Name"}
                                                                value={fetchedEditor.firstName}
                                                                size={3}
                                                                disabled={true}
                                        />
                                        <TextInputMetaComponent name={"lastName"}
                                                                label={"Last Name"}
                                                                value={fetchedEditor.lastName}
                                                                size={3}
                                                                disabled={true}
                                        />
                                        <TextInputMetaComponent name={"email"}
                                                                label={"Email address"}
                                                                value={fetchedEditor.email}
                                                                size={3}
                                                                disabled={true}
                                        />
                                        <TextInputMetaComponent name={"phoneNumber"}
                                                                label={"Phone Number"}
                                                                value={fetchedEditor.phoneNumber}
                                                                size={3}
                                                                disabled={true}
                                        />
                                        <TextInputMetaComponent name={"password"}
                                                                label={"Password"}
                                                                value={fetchedEditor.password}
                                                                type={"password"}
                                                                disabled={true}
                                                                size={3}/>
                                    </InputSectionMetaComponent>
                                    <SectionDividerMetaComponent/>
                                    <SectionHeaderMetaComponent header={"Address"}/>
                                    <SectionDescriptionMetaComponent
                                        description={"This information contains editors address"}/>
                                    <InputSectionMetaComponent>
                                        <TextInputMetaComponent name={"streetFirstLine"}
                                                                label={"Street First Line"}
                                                                value={fetchedEditor?.address?.streetFirstLine || ""}
                                                                size={4}
                                                                disabled={true}

                                        />
                                        <TextInputMetaComponent name={"streetSecondLine"}
                                                                label={"Street Second Line"}
                                                                value={fetchedEditor.address?.streetSecondLine || ""}
                                                                size={4}
                                                                disabled={true}

                                        />
                                        <TextInputMetaComponent name={"city"}
                                                                label={"City"}
                                                                value={fetchedEditor.address?.city || ""}
                                                                size={3}
                                                                disabled={true}
                                        />
                                        <TextInputMetaComponent name={"state"}
                                                                label={"State"}
                                                                value={fetchedEditor.address?.state || ""}
                                                                size={3} disabled={true}
                                        />
                                        <TextInputMetaComponent name={"country"}
                                                                label={"Country"}
                                                                value={fetchedEditor.address?.country || ""}
                                                                size={3} disabled={true}
                                        />
                                        <TextInputMetaComponent name={"zipCode"}
                                                                label={"Zip Code"}
                                                                value={fetchedEditor.address?.zipCode || ""}
                                                                size={3} disabled={true}
                                        />
                                    </InputSectionMetaComponent>
                                    <SectionDividerMetaComponent/>
                                </MainCardWrapper>
                            }
                        </MainWrapperComponent>
                    </>
                    :
                    <ErrorPage
                        header={"You aren't allowed to be here❌"}
                        description={"401 Unauthorized"}
                    />
            }
        </>


    )
}

export const loader = async ({params}) => {
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters, "Editor");
}

export const action = async ({request, params}) => {
    await request.formData();
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    return  await deleteHandler(urlWithPathVariable);
}