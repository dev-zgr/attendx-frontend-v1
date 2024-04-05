import {addParametersToURL, addPathVariablesToURL, apiLoader, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG} from "../../../config/config";
import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainCardWrapper} from "../../../components/Wrappers/MainCardWrapper";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {MainGridWrapper} from "../../../meta-components/cards/MainGridWrapper";
import {SubItemCardMetaComponent} from "../../../meta-components/cards/SubItemCardMetaComponent";
import {SubItemListWrapper} from "../../../meta-components/List/SubItemListWrapper";
import {SubListListItemMetaComponent} from "../../../meta-components/List/SubListListItemMetaComponent";

export const LecturerDetailPage = () => {
    const fetchedLecturer = useLoaderData();

    return (<MainWrapperComponent>
        <QueryManager>
            <QueryManagerButton label={"Update Lecturer"} to={"edit"}/>
            <QueryManagerButton label={"Back"} to={".."}/>
        </QueryManager>
        <MainCardWrapper>
            <SectionHeaderMetaComponent header={`Lecturer: ${fetchedLecturer.firstName}  ${fetchedLecturer.lastName}`}/>
            <InputSectionMetaComponent>
                <TextInputMetaComponent name={"firstName"}
                                        label={"First Name"}
                                        value={fetchedLecturer.firstName}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent name={"lastName"}
                                        label={"Last Name"}
                                        value={fetchedLecturer.lastName}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent name={"email"}
                                        label={"Email address"}
                                        value={fetchedLecturer.email}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent name={"phoneNumber"}
                                        label={"Phone Number"}
                                        value={fetchedLecturer.phoneNumber}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent
                    label={"Password"}
                    value={fetchedLecturer.password}
                    type={"password"}
                    disabled={true}
                    size={3}/>
                <TextInputMetaComponent
                    label={"Department"}
                    value={fetchedLecturer.department}
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
                                        value={fetchedLecturer.address.streetFirstLine}
                                        size={4}
                                        disabled={true}

                />
                <TextInputMetaComponent name={"streetSecondLine"}
                                        label={"Street Second Line"}
                                        value={fetchedLecturer.address.streetSecondLine}
                                        size={4}
                                        disabled={true}

                />
                <TextInputMetaComponent name={"city"}
                                        label={"City"}
                                        value={fetchedLecturer.address.city}
                                        size={3}
                                        disabled={true}
                />
                <TextInputMetaComponent name={"state"}
                                        label={"State"}
                                        value={fetchedLecturer.address.state}
                                        size={3} disabled={true}
                />
                <TextInputMetaComponent name={"country"}
                                        label={"Country"}
                                        value={fetchedLecturer.address.country}
                                        size={3} disabled={true}
                />
                <TextInputMetaComponent name={"zipCode"}
                                        label={"Zip Code"}
                                        value={fetchedLecturer.address.zipCode}
                                        size={3} disabled={true}
                />
            </InputSectionMetaComponent>
        </MainCardWrapper>
        <MainGridWrapper>
            <SubItemCardMetaComponent className={"col-start-3"}>
                <SectionHeaderMetaComponent header={"Courses"}/>
                <SectionDescriptionMetaComponent description={"Courses given by this lecturer..."}/>
                <SubItemListWrapper>
                    {
                        fetchedLecturer.courses.length === 0 ?
                            <SubListListItemMetaComponent>{"No Course given yet"}</SubListListItemMetaComponent> :
                            fetchedLecturer.courses.map((course, index) => {
                                return (
                                    <SubListListItemMetaComponent key={index}
                                                                  to={`/course/${course.courseCode}`}
                                    >{`${course.courseCode} - ${course.courseName}`}</SubListListItemMetaComponent>
                                )
                            })
                    }

                </SubItemListWrapper>
            </SubItemCardMetaComponent>
        </MainGridWrapper>

    </MainWrapperComponent>)

}

export const loader = async ({params}) => {
    const {email} = params;
    const relativeUrl = prepareURL(API_CONFIG.ENDPOINTS.LECTURER);
    const urlWithPathVariable = addPathVariablesToURL(relativeUrl, email);
    const urlWithParameters = addParametersToURL(urlWithPathVariable, {"get-details": true});
    return await apiLoader(urlWithParameters);
}