import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {MainCardWrapper} from "../../../components/Wrappers/MainCardWrapper";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {InputSectionMetaComponent} from "../../../meta-components/form/sections/InputSectionMetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {useSelector} from "react-redux";
import {ErrorPage} from "../../error/ErrorPage";

export const AccountPage = () => {
    const accountDetailsSlice = useSelector(state => state.accountDetailsSlice);
    return(
        <>
            {
                accountDetailsSlice.isLogged ?
                    <MainWrapperComponent>
                        <QueryManager>
                            <QueryManagerButton label={"Update Account"} to={"edit"}/>
                            <QueryManagerButton label={"Back"} to={".."}/>
                        </QueryManager>
                        <MainCardWrapper>
                            <SectionHeaderMetaComponent header={`User: ${accountDetailsSlice.userDetails.firstName}  ${accountDetailsSlice.userDetails.lastName}`}/>
                            <InputSectionMetaComponent>
                                <TextInputMetaComponent name={"firstName"}
                                                        label={"First Name"}
                                                        value={accountDetailsSlice.userDetails.firstName}
                                                        size={3}
                                                        disabled={true}
                                />
                                <TextInputMetaComponent name={"lastName"}
                                                        label={"Last Name"}
                                                        value={accountDetailsSlice.userDetails.lastName}
                                                        size={3}
                                                        disabled={true}
                                />
                                <TextInputMetaComponent name={"email"}
                                                        label={"Email address"}
                                                        value={accountDetailsSlice.userDetails.email}
                                                        size={3}
                                                        disabled={true}
                                />
                                <TextInputMetaComponent name={"phoneNumber"}
                                                        label={"Phone Number"}
                                                        value={accountDetailsSlice.userDetails.phoneNumber}
                                                        size={3}
                                                        disabled={true}
                                />
                                <TextInputMetaComponent
                                    label={"Password"}
                                    value={accountDetailsSlice.userDetails.password}
                                    type={"password"}
                                    disabled={true}
                                    size={3}/>
                                {
                                    accountDetailsSlice.userDetails.role === "STUDENT" &&
                                    <TextInputMetaComponent
                                        label={"Student Number"}
                                        value={accountDetailsSlice.userDetails.studentNumber}
                                        disabled={true}
                                        size={3}/>
                                }

                            </InputSectionMetaComponent>
                            <SectionDividerMetaComponent/>
                            <SectionHeaderMetaComponent header={"Address"}/>
                            <SectionDescriptionMetaComponent
                                description={"This information contains editors address"}/>
                            <InputSectionMetaComponent>
                                <TextInputMetaComponent name={"streetFirstLine"}
                                                        label={"Street First Line"}
                                                        value={accountDetailsSlice.userDetails.address.streetFirstLine}
                                                        size={4}
                                                        disabled={true}

                                />
                                <TextInputMetaComponent name={"streetSecondLine"}
                                                        label={"Street Second Line"}
                                                        value={accountDetailsSlice.userDetails.address.streetSecondLine}
                                                        size={4}
                                                        disabled={true}

                                />
                                <TextInputMetaComponent name={"city"}
                                                        label={"City"}
                                                        value={accountDetailsSlice.userDetails.address.city}
                                                        size={3}
                                                        disabled={true}
                                />
                                <TextInputMetaComponent name={"state"}
                                                        label={"State"}
                                                        value={accountDetailsSlice.userDetails.address.state}
                                                        size={3} disabled={true}
                                />
                                <TextInputMetaComponent name={"country"}
                                                        label={"Country"}
                                                        value={accountDetailsSlice.userDetails.address.country}
                                                        size={3} disabled={true}
                                />
                                <TextInputMetaComponent name={"zipCode"}
                                                        label={"Zip Code"}
                                                        value={accountDetailsSlice.userDetails.address.zipCode}
                                                        size={3} disabled={true}
                                />
                            </InputSectionMetaComponent>
                        </MainCardWrapper>
                    </MainWrapperComponent>
                    :
                    <ErrorPage
                        header={"You are not logged in 🔒"}
                        description={"Please login to view your account details"}
                    />
            }
        </>
    )
}