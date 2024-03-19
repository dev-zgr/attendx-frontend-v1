import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {redirect} from "react-router-dom";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";

export const DepartmentAddPage = () => {
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
            </QueryManager>
            <GenericFormManager>
                <SectionHeaderMetaComponent header={"Department"}/>
                <SectionDescriptionMetaComponent description={"This information will be displayed on the department description"}/>
                <InputSectionMetaComponent>
                    <TextInputMetaComponent name={"departmentName"} label={"Department Name"} placeholder={"eg. Department of Engineering"} size={3} validator={(text)=> textValidator(text,60)} />
                    <BlobInputMetaComponent name={"description"} label={"Description"} placeholder={"Write a brief description of the department"} validator={(text)=> textValidator(text,255)}/>
                </InputSectionMetaComponent>
                <SectionDividerMetaComponent/>
            </GenericFormManager>
        </MainWrapperComponent>

        )
}


export async function action({request}) {
    const data = await request.formData();

    const body = {
        departmentName: data.get("departmentName"),
        description: data.get("description")
    }

    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.DEPARTMENT), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if(!response.ok) {
        throw new Response(JSON.stringify({message: "Failed to create event"}), {status: 500});
    }
    return redirect("..")
}