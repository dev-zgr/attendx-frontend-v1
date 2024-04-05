import {useDispatch, useSelector} from "react-redux";
import {useActionData, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";
import {API_CONFIG, MODAL_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {ErrorPage} from "../../error/ErrorPage";
import {prepareURL} from "../../../utilityFunctions/apiHandling";

export const AccountUpdatePage = () => {
    const accountDetailsSlice = useSelector(state => state.accountDetailsSlice);
    const UIState = useSelector(state => state.UISlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionData = useActionData();


    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.ACCOUNT_UPDATE_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.ACCOUNT_UPDATE_ACTION_500));
            dispatch(UIActions.showModal());
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.ACCOUNT_UPDATE_ACTION_400));
            dispatch(UIActions.showModal());
        }else if(actionData === 404){
            dispatch(UIActions.setOpcode(MODAL_CODES.ACCOUNT_UPDATE_ACTION_404));
            dispatch(UIActions.showModal());
        }else if(actionData === 417){
            dispatch(UIActions.setOpcode(MODAL_CODES.ACCOUNT_UPDATE_ACTION_417));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);

    const toggleModal = () => {
        dispatch(UIActions.hideModal());
        navigate("..")
    }

    if (accountDetailsSlice.isLogged === false) {
        return (
            <ErrorPage
                header={"You are not logged in 🔒"}
                description={"Please login to view your account details"}
            />)

    }

    return (
        <>
            {UIState.showModal && UIState.opcode === MODAL_CODES.ACCOUNT_UPDATE_202 &&
                <InfoModalComponent
                    header={"Account Updated Successfully"}
                    message={"Your account information has been updated successfully!"}
                    toggleModal={toggleModal}
                />
            }

            {UIState.showModal && UIState.opcode === MODAL_CODES.ACCOUNT_UPDATE_ACTION_500 &&
                <InfoModalComponent
                    header={"Server Error"}
                    message={"Oops! Something went wrong on our end. Please try again later."}
                    toggleModal={toggleModal}
                />
            }

            {UIState.showModal && UIState.opcode === MODAL_CODES.ACCOUNT_UPDATE_ACTION_400 &&
                <InfoModalComponent
                    header={"Bad Request"}
                    message={"The request to update your account was invalid. Please check your input and try again."}
                    toggleModal={toggleModal}
                />
            }

            {UIState.showModal && UIState.opcode === MODAL_CODES.ACCOUNT_UPDATE_ACTION_404 &&
                <InfoModalComponent
                    header={"Not Found"}
                    message={"We couldn't find the resource you're looking for. Please contact support for assistance."}
                    toggleModal={toggleModal}
                />
            }

            {UIState.showModal && UIState.opcode === MODAL_CODES.ACCOUNT_UPDATE_ACTION_417 &&
                <InfoModalComponent
                    header={"Expectation Failed"}
                    message={"The server couldn't meet the requirements specified in the request. Please try again later."}
                    toggleModal={toggleModal}
                />
            }

            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager method={"PUT"}>
                    <input className={"hidden"} value={accountDetailsSlice.userDetails.role} name={"role"}/>
                    <SectionHeaderMetaComponent
                        header={`Editing: ${accountDetailsSlice.userDetails.firstName}  ${accountDetailsSlice.userDetails.lastName}`}/>
                    <InputSectionMetaComponent>
                        <input name={"email"} className={"hidden"} value={accountDetailsSlice.userDetails.email}/>
                        <TextInputMetaComponent name={"firstName"}
                                                label={"First Name"}
                                                value={accountDetailsSlice.userDetails.firstName}
                                                size={3}
                                                validator={(text) => textValidator(text, 60)}
                        />
                        <TextInputMetaComponent name={"lastName"}
                                                label={"Last Name"}
                                                value={accountDetailsSlice.userDetails.lastName}
                                                size={3}
                                                validator={(text) => textValidator(text, 60)}
                        />
                        <TextInputMetaComponent
                            label={"Email address"}
                            value={accountDetailsSlice.userDetails.email}
                            size={3}
                            disabled={true}

                        />
                        <TextInputMetaComponent name={"phoneNumber"}
                                                label={"Phone Number"}
                                                value={accountDetailsSlice.userDetails.phoneNumber}
                                                size={3}
                                                validator={(number) => numberValidator(number, 10)}
                        />
                        <TextInputMetaComponent name={"password"}
                                                label={"Password"}
                                                value={accountDetailsSlice.userDetails.password}
                                                type={"password"}
                                                size={3}
                                                validator={(text) => {
                                                    return text
                                                }}
                        />
                        {
                            accountDetailsSlice.userDetails.role === "STUDENT" &&
                            <TextInputMetaComponent
                                label={"Student Number"}
                                value={accountDetailsSlice.userDetails.studentNumber}
                                disabled={true}
                                size={3}/>
                        }
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent
                        description={"This information contains editors address"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"streetFirstLine"}
                                                label={"Street First Line"}
                                                value={accountDetailsSlice.userDetails.address.streetFirstLine}
                                                size={4}
                                                validator={(text) => textValidator(text, 255)}


                        />
                        <TextInputMetaComponent name={"streetSecondLine"}
                                                label={"Street Second Line"}
                                                value={accountDetailsSlice.userDetails.address.streetSecondLine}
                                                size={4}
                                                validator={(text) => textValidator(text, 255)}


                        />
                        <TextInputMetaComponent name={"city"}
                                                label={"City"}
                                                value={accountDetailsSlice.userDetails.address.city}
                                                size={3}
                                                validator={(text) => textValidator(text, 100)}

                        />
                        <TextInputMetaComponent name={"state"}
                                                label={"State"}
                                                value={accountDetailsSlice.userDetails.address.state}
                                                size={3}
                                                validator={(text) => textValidator(text, 100)}
                        />
                        <TextInputMetaComponent name={"country"}
                                                label={"Country"}
                                                value={accountDetailsSlice.userDetails.address.country}
                                                size={3}
                                                validator={(text) => textValidator(text, 100)}
                        />
                        <TextInputMetaComponent name={"zipCode"}
                                                label={"Zip Code"}
                                                value={accountDetailsSlice.userDetails.address.zipCode}
                                                size={3}
                                                validator={(text) => numberValidator(text, 5)}
                        />
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                </GenericFormManager>
            </MainWrapperComponent>
        </>
    )
}


export async function action({request}) {
    const data = await request.formData();
    const role = data.get("role");

    const body = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
        address: {
            streetFirstLine: data.get("streetFirstLine"),
            streetSecondLine: data.get("streetSecondLine"),
            city: data.get("city"),
            state: data.get("state"),
            country: data.get("country"),
            zipCode: data.get("zipCode")
        }
    }
    let endpoint;
    switch (role) {
        case ROLE_CONSTANTS.EDITOR:
            endpoint = API_CONFIG.ENDPOINTS.EDITOR;
            break
        case ROLE_CONSTANTS.STUDENT:
            endpoint = API_CONFIG.ENDPOINTS.STUDENT;
            break
        case ROLE_CONSTANTS.LECTURER:
            endpoint = API_CONFIG.ENDPOINTS.LECTURER;
            break
        default:
            endpoint = "";
    }

    console.log(role)

    const response = await fetch(prepareURL(endpoint), {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });
    const returnedResponse = await response;
    return returnedResponse.status;
}