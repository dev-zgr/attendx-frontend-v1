import {useLoaderData} from "react-router-dom";
import {
    addParametersToURL,
    addPathVariablesToURL, apiLoader,
    prepareURL
} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {TextInput} from "../../../meta-components/form/inputs/TextInput";
import {textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {MainCardWrapper} from "../../../components/MainCardWrapper";

export const DepartmentDetailPage = () => {
    const fetchedDepartment = useLoaderData();

    return (
        <MainWrapperComponent>
        <QueryManager>
            <QueryManagerButton label={"Update Department"} to={"edit"}/>
            <QueryManagerButton label={"Back"} to={".."}/>
        </QueryManager>
            <MainCardWrapper>
                <SectionHeaderMetaComponent header={`Department: ${fetchedDepartment.departmentName}`}/>
                <InputSectionMetaComponent>
                    <TextInput name={"departmentName"}
                               label={"Department Name"}
                               placeholder={"eg. Department of Engineering"}
                               size={3}
                               validator={(text) => textValidator(text, 60)}
                               value={fetchedDepartment.departmentName}
                               disabled={true}
                    />
                    <BlobInputMetaComponent name={"description"}
                                            label={"Description"}
                                            validator={(text) => textValidator(text, 255)}
                                            value={fetchedDepartment.description}
                                            disabled={true}
                    />
                </InputSectionMetaComponent>
                <SectionDividerMetaComponent/>
            </MainCardWrapper>
        </MainWrapperComponent>
    )
}

export const loader = async ({params}) => {
    const {departmentName} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.DEPARTMENT);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, departmentName);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}
