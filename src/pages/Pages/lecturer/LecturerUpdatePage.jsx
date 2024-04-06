import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {MODAL_CODES, OPTION_CODES} from "../../../config/config";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const LecturerUpdatePage = () => {
    const fetchedLecturer = useLoaderData();
    const UISlice = useSelector(state => state.UISlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_UPDATE_ACTION_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_UPDATE_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData === 404) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_UPDATE_ACTION_404));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LECTURER_UPDATE_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);


    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }
    return (
        <>
            {UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_UPDATE_ACTION_202 &&
                <InfoModalComponent
                    header={"Lecturer Updated Successfully"}
                    message={"You'll be redirected to the lecturer page shortly."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_UPDATE_ACTION_400 &&
                <InfoModalComponent
                    header={"Bad Data"}
                    message={"Please review all fields and try again."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_UPDATE_ACTION_404 &&
                <InfoModalComponent
                    header={"Lecturer Not Found"}
                    message={"The lecturer you are trying to update could not be found. Please try again later."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.LECTURER_UPDATE_ACTION_500 &&
                <InfoModalComponent
                    header={"Internal Server Error"}
                    message={"Failed to update lecturer due to server error. Please try again later."}
                    toggleModal={toggleModal}
                />
            }
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager method={"PUT"}>
                    <input name={"email"} className={"hidden"} value={fetchedLecturer.email} onChange={() => {}}/>
                    <SectionHeaderMetaComponent
                        header={`Lecturer: ${fetchedLecturer.firstName}  ${fetchedLecturer.lastName}`}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"firstName"}
                                                label={"First Name"}
                                                value={fetchedLecturer.firstName}
                                                size={3}
                                                validator={(text) => textValidator(text, 60)}
                        />
                        <TextInputMetaComponent name={"lastName"}
                                                label={"Last Name"}
                                                value={fetchedLecturer.lastName}
                                                size={3}
                                                validator={(text) => textValidator(text, 60)}
                        />
                        <TextInputMetaComponent
                                                label={"Email address"}
                                                value={fetchedLecturer.email}
                                                size={3}
                                                disabled={true}
                        />
                        <TextInputMetaComponent name={"phoneNumber"}
                                                label={"Phone Number"}
                                                value={fetchedLecturer.phoneNumber}
                                                size={3}
                                                validator={(number) => numberValidator(number, 10)}
                        />
                        <TextInputMetaComponent name={"password"}
                                                label={"Password"}
                                                value={fetchedLecturer.password}
                                                type={"password"}
                                                size={3}
                                                validator={(text) => {return text}}
                        />
                        <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT} name={"department"}
                                                label={"Department"} size={3}
                                                placeholder={"Select lecturer's department"}

                        />
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent
                        description={"This information contains editors address"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"streetFirstLine"}
                                                label={"Street First Line"}
                                                value={fetchedLecturer.address.streetFirstLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"streetSecondLine"}
                                                label={"Street Second Line"}
                                                value={fetchedLecturer.address.streetSecondLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"city"}
                                                label={"City"}
                                                value={fetchedLecturer.address.city}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}

                        />
                        <TextInputMetaComponent name={"state"}
                                                label={"State"}
                                                value={fetchedLecturer.address.state}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"country"}
                                                label={"Country"}
                                                value={fetchedLecturer.address.country}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"zipCode"}
                                                label={"Zip Code"}
                                                value={fetchedLecturer.address.zipCode}
                                                size={3}
                                                validator={(text) => numberValidator(text,5)}
                        />
                    </InputSectionMetaComponent>
                </GenericFormManager>
            </MainWrapperComponent>

        </>
    )
}