import {useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const EditorUpdatePage = () => {
    const fetchedEditor = useLoaderData();
    const UIState = useSelector(state => state.UISlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const actionData = useActionData();


    useEffect(() => {
        if (actionData) {
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("..");
            }, 2000);
        }
    }, [actionData, dispatch, navigate]);


    const toggleModal = () => {
        dispatch(UIActions.hideModal());
        navigate("..")
    }

    return (

        <>
            {
                UIState.showModal &&
                <InfoModalComponent
                    header={"Editor Updated"}
                    message={"Editor has updated successfully!"}
                    toggleModal={toggleModal}
                />
            }
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager method={"PUT"}>
                    <SectionHeaderMetaComponent header={`Editing: ${fetchedEditor.firstName}  ${fetchedEditor.lastName}`}/>
                    <InputSectionMetaComponent>
                        <input name={"email"} className={"hidden"} value={fetchedEditor.email}/>
                        <TextInputMetaComponent name={"firstName"}
                                                label={"First Name"}
                                                value={fetchedEditor.firstName}
                                                size={3}
                                                validator={(text) => textValidator(text,60)}
                        />
                        <TextInputMetaComponent name={"lastName"}
                                                label={"Last Name"}
                                                value={fetchedEditor.lastName}
                                                size={3}
                                                validator={(text) => textValidator(text,60)}
                        />
                        <TextInputMetaComponent
                            label={"Email address"}
                            value={fetchedEditor.email}
                            size={3}
                            disabled={true}

                        />
                        <TextInputMetaComponent name={"phoneNumber"}
                                                label={"Phone Number"}
                                                value={fetchedEditor.phoneNumber}
                                                size={3}
                                                validator={(number) => numberValidator(number,10)}
                        />
                        <TextInputMetaComponent name={"password"}
                                                label={"Password"}
                                                value={fetchedEditor.password}
                                                type={"password"}
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
                                                value={fetchedEditor.address.streetFirstLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"streetSecondLine"}
                                                label={"Street Second Line"}
                                                value={fetchedEditor.address.streetSecondLine}
                                                size={4}
                                                validator={(text) => textValidator(text,255)}


                        />
                        <TextInputMetaComponent name={"city"}
                                                label={"City"}
                                                value={fetchedEditor.address.city}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}

                        />
                        <TextInputMetaComponent name={"state"}
                                                label={"State"}
                                                value={fetchedEditor.address.state}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"country"}
                                                label={"Country"}
                                                value={fetchedEditor.address.country}
                                                size={3}
                                                validator={(text) => textValidator(text,100)}
                        />
                        <TextInputMetaComponent name={"zipCode"}
                                                label={"Zip Code"}
                                                value={fetchedEditor.address.zipCode}
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