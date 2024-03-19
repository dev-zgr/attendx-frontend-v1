import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, OPTION_CODES} from "../../../config/config";
import {redirect} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {numberValidator, textValidator} from "../../../utilityFunctions/validator";
import {BlobInputMetaComponent} from "../../../meta-components/form/inputs/BlobInputMetaComponent";
import {SelectBoxMetaComponent} from "../../../meta-components/form/inputs/SelectBoxMetaComponent";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {DateInputMetaComponent} from "../../../meta-components/form/inputs/DateInputMetaComponent";

export const CourseAddPage = () => {
    return (
        <>
            <MainWrapperComponent>
                <QueryManager>
                    <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
                </QueryManager>
                <GenericFormManager>
                    <SectionHeaderMetaComponent header={"Course"}/>
                    <SectionDescriptionMetaComponent
                        description={"This information will be used for storing course information"}/>
                    <InputSectionMetaComponent>
                        <TextInputMetaComponent name={"courseCode"} label={"Course Code"} placeholder={"eg. YMH212"}
                                                size={3} validator={(text) => textValidator(text, 60)}/>
                        <TextInputMetaComponent name={"courseName"} label={"Course Name"}
                                                placeholder={"eg. Advanced Programming Concepts"} size={3}
                                                validator={(text) => textValidator(text, 60)}/>
                        <SelectBoxMetaComponent optionCode={OPTION_CODES.LECTURER} name={"lecturerEmail"}
                                                label={"Lecturer"} size={3}
                                                placeholder={"Select lecturer's department"}/>
                        <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT} name={"department"}
                                                label={"Department"} size={3}
                                                placeholder={"Select lecturer's department"}/>

                        <TextInputMetaComponent name={"phoneNumber"} label={"Phone Number"}
                                                placeholder={"eg. 3604902204"} size={3}
                                                validator={(number) => numberValidator(number, 10)}/>
                        <TextInputMetaComponent name={"password"} label={"Password"} size={3} type={"password"}
                                                validator={(text) => {
                                                    return text
                                                }}/>
                        <BlobInputMetaComponent name={"description"} label={"Description"}
                                                placeholder={"Write a brief description of the department"}
                                                validator={(text) => textValidator(text, 255)}/>
                        <DateInputMetaComponent
                            name={"startDate"} label={"Start Date"} size={3} placeholder={"eg. 2021-01-01"}
                        />
                    </InputSectionMetaComponent>

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

    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Failed to create event"}), {status: 500});
    }
    return redirect("..")
}