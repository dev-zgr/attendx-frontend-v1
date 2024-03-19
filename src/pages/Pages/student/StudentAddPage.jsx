import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {redirect} from "react-router-dom";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";

export const StudentAddPage = () => {
    return (
        <>
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager>
                    <SectionHeaderMetaComponent header={"Student"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing student information"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"firstName"} label={"First Name"} placeholder={"eg. Özgür"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInputMetaComponent name={"lastName"} label={"Last Name"} placeholder={"eg. Kamalı"} size={3} validator={(text) => textValidator(text,60)}/>
                        <TextInputMetaComponent name={"email"} label={"Email address"} placeholder={"eg. ozgur@kamali.com"} size={3} validator={(text) => textValidator(text,16)}/>
                        <TextInputMetaComponent name={"phoneNumber"} label={"Phone Number"} placeholder={"eg. 3604902204"} size={3} validator={(number) => numberValidator(number,10)}/>
                        <TextInputMetaComponent name={"password"} label={"Password"}  size={3} type={"password"} validator={(text) => {return text}}/>
                    </InputSectionMetaComponent>
                    <SectionDividerMetaComponent/>
                    <SectionHeaderMetaComponent header={"Address"}/>
                    <SectionDescriptionMetaComponent description={"This information will be used for storing students address"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"streetFirstLine"} label={"Street First Line"} size={4} placeholder={"eg. 416 Lake Crescent rd."} validator={(text) => textValidator(text,255)}/>
                        <TextInputMetaComponent name={"streetSecondLine"} label={"Street Second Line"}  size={4} placeholder={"eg. W-10"} validator={(text) => textValidator(text,255)}/>
                        <TextInputMetaComponent name={"city"} label={"City"} placeholder={"eg. Port Angeles"} size={3} validator={(text) => textValidator(text,100)} />
                        <TextInputMetaComponent name={"state"} label={"State"} placeholder={"eg. WA"} size={3} validator={(text) => textValidator(text,100)} />
                        <TextInputMetaComponent name={"country"} label={"Country"} placeholder={"eg. USA"} size={3} validator={(text) => textValidator(text,100)}/>
                        <TextInputMetaComponent name={"zipCode"} label={"Zip Code"} placeholder={"eg. 98363"} size={3} validator={(number) => numberValidator(number,5)}/>
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

    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.STUDENT), {
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