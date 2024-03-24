import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
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
                <GenericFormManager method={"POST"}>
                    <SectionHeaderMetaComponent header={"Editor"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing editor information"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"firstName"} label={"First Name"} placeholder={"eg. Özgür"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInputMetaComponent name={"lastName"} label={"Last Name"} placeholder={"eg. Kamalı"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInputMetaComponent name={"email"} label={"Email address"} placeholder={"eg. ozgur@kamali.com"} size={3} validator={(text) => textValidator(text,16)}/>
                        <TextInputMetaComponent name={"phoneNumber"} label={"Phone Number"} placeholder={"eg. 3604902204"} size={3} validator={(number) => numberValidator(number,10)}/>
                        <TextInputMetaComponent name={"password"} label={"Password"} placeholder={""} type={"password"} validator={(text) => {return text}} size={3}/>
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing students address"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"streetFirstLine"} label={"Street First Line"} placeholder={"eg. 416 Lake Crescent rd."} validator={(text) => textValidator(text,255)} size={4}/>
                        <TextInputMetaComponent name={"streetSecondLine"} label={"Street Second Line"} placeholder={"eg. W-10"} validator={(text) => textValidator(text,255)} size={4}/>
                        <TextInputMetaComponent name={"city"} label={"City"} placeholder={"eg. Port Angeles"} validator={(text) => textValidator(text,100)} size={3}/>
                        <TextInputMetaComponent name={"state"} label={"State"} placeholder={"eg. WA"} validator={(text) => textValidator(text,100)} size={3}/>
                        <TextInputMetaComponent name={"country"} label={"Country"} placeholder={"eg. USA"} validator={(text) => textValidator(text,100)} size={3}/>
                        <TextInputMetaComponent name={"zipCode"} label={"Zip Code"} placeholder={"eg. 98363"} validator={(number) => numberValidator(number,5)} size={3}/>
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                </GenericFormManager>
            </MainWrapperComponent>
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
        method: request.method,
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