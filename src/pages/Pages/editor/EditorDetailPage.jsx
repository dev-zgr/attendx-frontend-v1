import {
    addParametersToURL,
    addPathVariablesToURL,
    apiLoader,
    deleteHandler,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {redirect, useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {QueryManager} from "../../../components/QueryManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {MainCardWrapper} from "../../../components/MainCardWrapper";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {
    QueryManagerDeleteButtonMetaComponent
} from "../../../meta-components/buttons/QueryManagerDeleteButtonMetaComponent";
import {useState} from "react";
import {DeleteModalComponent} from "../../../components/DeleteModalComponent";

export const EditorDetailPage = () => {
    const fetchedEditor = useLoaderData();
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal((prevState) => !prevState);
    }

    const editorDeleteHandler =  async () => {
        const relativeUrl =  prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
        const urlWithPathVariable =  addPathVariablesToURL(relativeUrl, fetchedEditor.email);
         await deleteHandler(urlWithPathVariable);
        return redirect("..");
    }

    return (<>
        {
            modal &&
            <DeleteModalComponent
                header={"Are you sure you want to delete this Editor?"}
                message={`This action cannot be undone and will delete all the information related to editor ${fetchedEditor.firstName + " " + fetchedEditor.lastName}`}
                toggleModal={toggleModal}
                handleDelete={editorDeleteHandler}
            />}
        <MainWrapperComponent>
        <QueryManager>
            <QueryManagerButton label={"Update Editor"} to={"edit"}/>
            <QueryManagerDeleteButtonMetaComponent label={"Delete Editor"} setModal={toggleModal}/>
            <QueryManagerButton label={"Back"} to={".."}/>
        </QueryManager>
        <MainCardWrapper>
            <SectionHeaderMetaComponent header={`Editor: ${fetchedEditor.firstName}  ${fetchedEditor.lastName}`}/>
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
                                        value={fetchedEditor.address.streetFirstLine}
                                        size={4}
                                        disabled={true}

                />
                <TextInputMetaComponent name={"streetSecondLine"}
                                        label={"Street Second Line"}
                                        value={fetchedEditor.address.streetSecondLine}
                                        size={4}
                                        disabled={true}

                />
                <TextInputMetaComponent name={"city"}
                                        label={"City"}
                                        value={fetchedEditor.address.city}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent name={"state"}
                                        label={"State"}
                                        value={fetchedEditor.address.state}
                                        size={3} disabled={true}
                />
                <TextInputMetaComponent name={"country"}
                                        label={"Country"}
                                        value={fetchedEditor.address.country}
                                        size={3} disabled={true}
                />
                <TextInputMetaComponent name={"zipCode"}
                                        label={"Zip Code"}
                                        value={fetchedEditor.address.zipCode}
                                        size={3} disabled={true}
                />
            </InputSectionMetaComponent>
            <SectionDividerMetaComponent/>
        </MainCardWrapper>
    </MainWrapperComponent>
    </>)
}

export const loader = async ({params}) => {
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}

export const action = async ({request,params}) => {
const data = await request.formData();
    console.log(data)
    console.log(request)

    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.EDITOR);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    await deleteHandler(urlWithPathVariable);
    return redirect("..")
}