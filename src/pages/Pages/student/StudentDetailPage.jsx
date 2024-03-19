import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainCardWrapper} from "../../../components/MainCardWrapper";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInput} from "../../../meta-components/form/inputs/TextInput";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {addParametersToURL, addPathVariablesToURL, apiLoader, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";

export const StudentDetailPage = () => {
    const fetchedStudent = useLoaderData();

    return (<MainWrapperComponent>
        <QueryManager>
            <QueryManagerButton label={"Update Student"} to={"edit"}/>
            <QueryManagerButton label={"Back"} to={".."}/>
        </QueryManager>
        <MainCardWrapper>
            <SectionHeaderMetaComponent header={`Editor: ${fetchedStudent.firstName}  ${fetchedStudent.lastName}`}/>
            <InputSectionMetaComponent>
                <TextInput name={"firstName"}
                           label={"First Name"}
                           value={fetchedStudent.firstName}
                           size={3}
                           disabled={true}
                />
                <TextInput name={"lastName"}
                           label={"Last Name"}
                           value={fetchedStudent.lastName}
                           size={3}
                           disabled={true}
                />
                <TextInput name={"email"}
                           label={"Email address"}
                           value={fetchedStudent.email}
                           size={3}
                           disabled={true}
                />
                <TextInput name={"phoneNumber"}
                           label={"Phone Number"}
                           value={fetchedStudent.phoneNumber}
                           size={3}
                           disabled={true}
                />
                <TextInput name={"password"}
                           label={"Password"}
                           value={fetchedStudent.password}
                           type={"password"}
                           disabled={true}
                           size={3}/>
            </InputSectionMetaComponent>
            <SectionDividerMetaComponent/>
            <SectionHeaderMetaComponent header={"Address"}/>
            <SectionDescriptionMetaComponent
                description={"This information contains editors address"}/>
            <InputSectionMetaComponent>
                <TextInput name={"streetFirstLine"}
                           label={"Street First Line"}
                           value={fetchedStudent.address.streetFirstLine}
                           size={4}
                           disabled={true}

                />
                <TextInput name={"streetSecondLine"}
                           label={"Street Second Line"}
                           value={fetchedStudent.address.streetSecondLine}
                           size={4}
                           disabled={true}

                />
                <TextInput name={"city"}
                           label={"City"}
                           value={fetchedStudent.address.city}
                           size={3}
                           disabled={true}
                />
                <TextInput name={"state"}
                           label={"State"}
                           value={fetchedStudent.address.state}
                           size={3} disabled={true}
                />
                <TextInput name={"country"}
                           label={"Country"}
                           value={fetchedStudent.address.country}
                           size={3} disabled={true}
                />
                <TextInput name={"zipCode"}
                           label={"Zip Code"}
                           value={fetchedStudent.address.zipCode}
                           size={3} disabled={true}
                />
            </InputSectionMetaComponent>
            <SectionDividerMetaComponent/>
        </MainCardWrapper>
    </MainWrapperComponent>)
}

export const loader = async ({params}) => {
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.STUDENT);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}