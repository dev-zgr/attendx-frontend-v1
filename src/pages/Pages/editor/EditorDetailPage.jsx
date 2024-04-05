import {
    addParametersToURL,
    addPathVariablesToURL,
    apiLoader,
    deleteHandler,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, ROLE_CONSTANTS} from "../../../config/config";
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
    const UIState = useSelector(state => state.UISlice);
    const sessionState = useSelector(state => state.accountDetailsSlice);

    const closeModal = () => {
        dispatch(UIActions.hideModal());
    }

    useEffect(() => {
        if (actionData) {
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        }
    }, [actionData, dispatch, navigate]);

    const openModal = () => {
        dispatch(UIActions.showModal());
    }

    if (UIState.showModal && actionData) {
        return (
            <>
                {
                    UIState.showModal &&
                    <InfoModalComponent
                        header={"Editor Deleted!"}
                        message={"Editor has been deleted successfully!"}
                        toggleModal={closeModal}
                    />
                }
            </>
        )
    }
    return (
        <>

            {
                sessionState.isLogged && sessionState.userDetails.role === ROLE_CONSTANTS.EDITOR ?
                    <>
                        {
                            UIState.showModal &&
                            <DeleteModalComponent
                                header={"Are you sure you want to delete this Editor?"}
                                message={`This action cannot be undone and will delete all the information related to editor ${fetchedEditor.firstName + " " + fetchedEditor.lastName}`}
                                toggleModal={closeModal}
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
                        description={"404 Unauthorized"}
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
    return await apiLoader(urlWithParameters);
}

export const action = async ({request, params}) => {
    await request.formData();
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    await deleteHandler(urlWithPathVariable);
    return true;
}