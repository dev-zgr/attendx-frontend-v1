import {convertDateFormat, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, OPTION_CODES} from "../../../config/config";
import {redirect} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {textValidator} from "../../../utilityFunctions/validator";
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
                                                size={3} validator={() => true}/>
                        <TextInputMetaComponent name={"courseName"} label={"Course Name"}
                                                placeholder={"eg. Advanced Programming Concepts"} size={3}
                                                validator={(text) => textValidator(text, 60)}/>
                        <DateInputMetaComponent
                            name={"startDate"} label={"Start Date"} size={3} placeholder={"eg. 2021-01-01"}
                        />
                        <DateInputMetaComponent
                            name={"endDate"} label={"End Date"} size={3} placeholder={"eg. 2021-05-01"}
                        />
                        <SelectBoxMetaComponent optionCode={OPTION_CODES.LECTURER} name={"lecturerEmail"}
                                                label={"Lecturer"} size={3}
                                                placeholder={"Select lecturer's department"}/>
                        <SelectBoxMetaComponent optionCode={OPTION_CODES.DEPARTMENT} name={"departmentName"}
                                                label={"Department"} size={3}
                                                placeholder={"Select lecturer's department"}/>

                        <BlobInputMetaComponent name={"description"} label={"Description"}
                                                placeholder={"Write a brief description of the department"}
                                                validator={(text) => textValidator(text, 255)}/>
                    </InputSectionMetaComponent>

                </GenericFormManager>
            </MainWrapperComponent>
        </>
    )
}


export async function action({request}) {
    const data = await request.formData();
    const formattedStartDate = convertDateFormat(data.get("startDate"));
    const formattedEndDate = convertDateFormat(data.get("endDate"));
    const body = {
        courseCode: data.get("courseCode"),
        courseName: data.get("courseName"),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        lecturerEmail: data.get("lecturerEmail"),
        departmentName: data.get("departmentName"),
        description: data.get("description"),
        enrolledStudents: [],
    }
    const response = await fetch(prepareURL(API_CONFIG.ENDPOINTS.COURSE), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (response.status === 500 || response.status !== 201) {
        throw new Response(JSON.stringify({message: "Failed to create event"}), {status: 500});
    }
    return redirect("..")
}