import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";
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
import {MODAL_CODES} from "../../../config/config";

export const StudentUpdatePage = () => {
    const fetchedStudent = useLoaderData();
    const UISlice = useSelector(state => state.UISlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData === 202) {
            dispatch(UIActions.setOpcode(MODAL_CODES.STUDENT_UPDATE_ACTION_202));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        } else if (actionData === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.STUDENT_UPDATE_ACTION_400));
            dispatch(UIActions.showModal());
        }else if (actionData === 404) {
            dispatch(UIActions.setOpcode(MODAL_CODES.STUDENT_UPDATE_ACTION_404));
            dispatch(UIActions.showModal());
        } else if (actionData === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.STUDENT_UPDATE_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [actionData, dispatch, navigate]);


    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }
    return (
        <>
            {UISlice.showModal && UISlice.opcode === MODAL_CODES.STUDENT_UPDATE_ACTION_202 &&
                <InfoModalComponent
                    header={"Student Updated Successfully"}
                    message={"You'll be redirected to the student page shortly."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.STUDENT_UPDATE_ACTION_400 &&
                <InfoModalComponent
                    header={"Bad Data"}
                    message={"Please review all fields and try again."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.STUDENT_UPDATE_ACTION_404 &&
                <InfoModalComponent
                    header={"Student Not Found"}
                    message={"The student you are trying to update could not be found. Please try again later."}
                    toggleModal={toggleModal}
                />
            }

            {UISlice.showModal && UISlice.opcode === MODAL_CODES.STUDENT_UPDATE_ACTION_500 &&
                <InfoModalComponent
                    header={"Internal Server Error"}
                    message={"Failed to update editor due to server error. Please try again later."}
                    toggleModal={toggleModal}
                />
            }
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager method={"PUT"}>
                    <SectionHeaderMetaComponent header={`Editing: ${fetchedStudent.firstName}  ${fetchedStudent.lastName}`}/>
                    <InputSectionMetaComponent>
                        <input name={"email"} className={"hidden"} value={fetchedStudent.email}/>
                        <TextInputMetaComponent name={"firstName"}
                                                label={"First Name"}
                                                value={fetchedStudent.firstName}
                                                size={3}
                                                validator={(text) => textValidator(text,60)}
                        />
                        <TextInputMetaComponent name={"lastName"}
                                                label={"Last Name"}
                                                value={fetchedStudent.lastName}
                                                size={3}
                                                validator={(text) => textValidator(text,60)}
                        />
                        <TextInputMetaComponent
                            label={"Email address"}
                            value={fetchedStudent.email}
                            size={3}
                            disabled={true}

                        />
                        <TextInputMetaComponent name={"phoneNumber"}
                                                label={"Phone Number"}
                                                value={fetchedStudent.phoneNumber}
                                                size={3}
                                                validator={(number) => numberValidator(number,10)}
                        />
                        <TextInputMetaComponent name={"password"}
                                                label={"Password"}
                                                value={fetchedStudent.password}
                                                type={"password"}
                                                size={3}
                                                validator={(text) => {return text}}
                        />
                        <TextInputMetaComponent name={"studentNumber"}
                                                label={"Student Number"}
                                                value={fetchedStudent.studentNumber}
                                                type={"text"}
                                                disabled={true}
                                                size={3}
                                                validator={(text) => {return text}}
                        />
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent
                        description={"This information contains editors address"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"streetFirstLine"}
                                                label={"Street First Line"}
                                                value={fetchedStudent.address.streetFirstLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"streetSecondLine"}
                                                label={"Street Second Line"}
                                                value={fetchedStudent.address.streetSecondLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"city"}
                                                label={"City"}
                                                value={fetchedStudent.address.city}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}

                        />
                        <TextInputMetaComponent name={"state"}
                                                label={"State"}
                                                value={fetchedStudent.address.state}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"country"}
                                                label={"Country"}
                                                value={fetchedStudent.address.country}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"zipCode"}
                                                label={"Zip Code"}
                                                value={fetchedStudent.address.zipCode}
                                                size={3}
                                                validator={(text) => numberValidator(text,5)}
                        />
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                </GenericFormManager>
            </MainWrapperComponent>
        </>
    )
}