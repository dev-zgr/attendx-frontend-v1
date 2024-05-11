import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES, OPTION_CODES, ROLE_CONSTANTS} from "../../../config/config";
import {useActionData, useNavigate} from "react-router-dom";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {useDispatch, useSelector} from "react-redux";
import {ErrorPage} from "../../error/ErrorPage";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const LecturerAddPage = () => {
    const UISlice = useSelector(state => state.UISlice);
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData === 201) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_ADD_ACTION_201));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_ADD_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_ADD_ACTION_500));
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
                        <>
                            {
                                UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_ADD_ACTION_201 &&
                                <InfoModalComponent
                                    header={"Lecturer Added Successfully"}
                                    message={"We're redirecting you to lecturers page!"}
                                    toggleModal={toggleModal}
                                />
                            }
                            {
                                UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_ADD_ACTION_400 &&
                                <InfoModalComponent
                                    header={"Bad Data"}
                                    message={"Please check all the fields again!"}
                                    toggleModal={toggleModal}
                                />
                            }
                            {
                                UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_ADD_ACTION_500 &&
                                <InfoModalComponent
                                    header={"Internal Server Error"}
                                    message={"Lecturer Addition failed, please try again later!"}
                                    toggleModal={toggleModal}
                                />
                            }
                        </>
                        <MainWrapperComponent>
                            <QueryManager>
                                <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                            </QueryManager>
                            <GenericFormManager method={"POST"}>
                                <SectionHeaderMetaComponent header={"Lecturer"}/>
                                <SectionDescriptionMetaComponent
                                    description={"This information will be used for storing lecturer information"}/>
                                <InputSectionMetaComponent>
                                    <TextInputMetaComponent name={"firstName"} label={"First Name"}
                                                            placeholder={"eg. Özgür"} size={3}
                                                            validator={(text) => textValidator(text, 60)}/>
                                    <TextInputMetaComponent name={"lastName"} label={"Last Name"} placeholder={"eg. Kamalı"}
                                                            size={3} validator={(text) => textValidator(text, 60)}/>
                                    <TextInputMetaComponent name={"email"} label={"Email address"}
                                                            placeholder={"eg. ozgur@kamali.com"} size={3}
                                                            validator={(text) => textValidator(text, 80)}/>
                                    <TextInputMetaComponent name={"phoneNumber"} label={"Phone Number"}
                                                            placeholder={"eg. 3604902204"} size={3}
                                                            validator={(number) => numberValidator(number, 10)}/>
                                    <TextInputMetaComponent name={"password"} label={"Password"} size={3} type={"password"}
                                                            validator={(text) => {
                                                                return text
                                                            }}/>
                                    <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT} name={"department"}
                                                            label={"Department"} size={3}
                                                            placeholder={"Select lecturer's department"}/>

                                </InputSectionMetaComponent>
                                <SectionDividerMetaComponent/>
                                <SectionHeaderMetaComponent header={"Address"}/>
                                <SectionDescriptionMetaComponent
                                    description={"This information will be used for storing lecturers address"}/>
                                <InputSectionMetaComponent>
                                    <TextInputMetaComponent name={"streetFirstLine"} label={"Street First Line"}
                                                            placeholder={"eg. 416 Lake Crescent rd."} size={4}
                                                            validator={(text) => textValidator(text, 255)}/>
                                    <TextInputMetaComponent name={"streetSecondLine"} label={"Street Second Line"}
                                                            placeholder={"eg. W-10"} size={4}
                                                            validator={(text) => textValidator(text, 255)}/>
                                    <TextInputMetaComponent name={"city"} label={"City"} placeholder={"eg. Port Angeles"}
                                                            size={3} validator={(text) => textValidator(text, 100)}/>
                                    <TextInputMetaComponent name={"state"} label={"State"} placeholder={"eg. WA"} size={3}
                                                            validator={(text) => textValidator(text, 100)}/>
                                    <TextInputMetaComponent name={"country"} label={"Country"} placeholder={"eg. USA"}
                                                            size={3} validator={(text) => textValidator(text, 100)}/>
                                    <TextInputMetaComponent name={"zipCode"} label={"Zip Code"} placeholder={"eg. 98363"}
                                                            size={3} validator={(number) => numberValidator(number, 5)}/>
                                </InputSectionMetaComponent>
                                <SectionDividerMetaComponent/>
                            </GenericFormManager>

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

export async function action({request}) {
    const data = await request.formData();
    const body = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
        department: data.get("department"),
        address: {
            streetFirstLine: data.get("streetFirstLine"),
            streetSecondLine: data.get("streetSecondLine"),
            city: data.get("city"),
            state: data.get("state"),
            country: data.get("country"),
            zipCode: data.get("zipCode")
        }
    }
    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.LECTURER), {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    const returnedResponse = await response;
    if (returnedResponse.status === 401) {
        throw new Response(JSON.stringify({
            header: "You aren't allowed to be here❌",
            description: "401 Unauthorized"
        }), {status: 401});
    }
    return returnedResponse.status;
}