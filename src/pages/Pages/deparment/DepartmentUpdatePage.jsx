import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInput} from "../../../meta-components/form/inputs/TextInput";
import {textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {useLoaderData} from "react-router-dom";

export const DepartmentUpdatePage = () => {
    const fetchedDepartment = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
            </QueryManager>
            <GenericFormManager>
                <SectionHeaderMetaComponent header={`Editing: ${fetchedDepartment.departmentName}`}/>
                <SectionDescriptionMetaComponent
                    description={"You're currently editing the department. Changes will be permanent after you click save button"}/>
                <InputSectionMetaComponent>
                    <TextInput
                        value={fetchedDepartment.departmentName}
                        name={"departmentName"}
                        label={"Department Name"}
                        placeholder={"eg. Department of Engineering"}
                        size={3}
                        validator={(text) => textValidator(text, 60)}/>
                    <BlobInputMetaComponent
                        value={fetchedDepartment.description}
                        name={"description"}
                        label={"Description"}
                        validator={(text) => textValidator(text, 255)}/>
                </InputSectionMetaComponent>
                <SectionDividerMetaComponent/>
            </GenericFormManager>
        </MainWrapperComponent>
    )
}

