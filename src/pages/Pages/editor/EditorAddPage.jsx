import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInput} from "../../../meta-components/form/inputs/TextInput";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {redirect} from "react-router-dom";

export const EditorAddPage = () => {
    return (
        <>
            <MainWrapperComponent>
                <QueryManager/>
                <GenericFormManager>
                    <SectionHeaderMetaComponent header={"Student"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing student information"}/>
                    <InputSectionMetaComponent>
                        <TextInput name={"firstName"} label={"First Name"} placeholder={"eg. Özgür"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInput name={"lastName"} label={"Last Name"} placeholder={"eg. Kamalı"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInput name={"email"} label={"Email address"} placeholder={"eg. ozgur@kamali.com"} size={3} validator={(text) => textValidator(text,16)}/>
                        <TextInput name={"phoneNumber"} label={"Phone Number"} placeholder={"eg. 3604902204"} size={3} validator={(number) => numberValidator(number,10)}/>
                        <TextInput name={"password"} label={"Password"} placeholder={""} type={"password"} validator={(text) => {return true}} size={3}/>
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing students address"}/>
                    <InputSectionMetaComponent>
                        <TextInput name={"streetFirstLine"} label={"Street First Line"} placeholder={"eg. 416 Lake Crescent rd."} validator={(text) => textValidator(text,255)} size={4}/>
                        <TextInput name={"streetSecondLine"} label={"Street Second Line"} placeholder={"eg. W-10"} validator={(text) => textValidator(text,255)} size={4}/>
                        <TextInput name={"city"} label={"City"} placeholder={"eg. Port Angeles"} validator={(text) => textValidator(text,100)} size={3}/>
                        <TextInput name={"state"} label={"State"} placeholder={"eg. WA"} validator={(text) => textValidator(text,100)} size={3}/>
                        <TextInput name={"country"} label={"Country"} placeholder={"eg. USA"} validator={(text) => textValidator(text,100)}  size={3}/>
                        <TextInput name={"zipCode"} label={"Zip Code"} placeholder={"eg. 98363"}  validator={(number) => numberValidator(number,5)} size={3}/>
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                </GenericFormManager>
            </MainWrapperComponent>
        </>
    )
}


export async function action({request, params}) {
    const data = await request.formData();
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

    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.EDITOR), {
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