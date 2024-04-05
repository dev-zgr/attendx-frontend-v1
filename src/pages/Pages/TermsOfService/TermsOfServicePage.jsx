import {InfoPageH2MetaComponent} from "../../../meta-components/InfoPage/InfoPageH2MetaComponent";
import React from "react";
import {InfoPagePMetaComponent} from "../../../meta-components/InfoPage/InfoPagePMetaComponent";
import {InfoPageWrapperComponent} from "../../../components/Wrappers/InfoPageWrapperComponent";
import {InfoPageH1MetaComponent} from "../../../meta-components/InfoPage/InfoPageH1MetaComponent";

export const TermsOfServicePage = () => {
    return (
        <InfoPageWrapperComponent>
            <InfoPageH1MetaComponent>
                Terms of Service
            </InfoPageH1MetaComponent>
            <InfoPageH2MetaComponent>
                1. Acceptance of Terms
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>Welcome to AttendX! By accessing or using our platform, you agree to comply with these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing AttendX.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                2. Use of the Platform
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>AttendX grants you a non-exclusive, non-transferable, revocable license to use the platform for your personal or internal business purposes. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the platform without explicit written permission from AttendX.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                3. User Accounts
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>In order to access certain features of AttendX, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. AttendX reserves the right to suspend or terminate your account if it believes that you have violated these Terms or engaged in any fraudulent, abusive, or illegal activities.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                4. Intellectual Property Rights
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>All content and materials available on AttendX, including but not limited to text, graphics, logos, images, software, and audio/video clips, are the property of AttendX or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                5. Limitation of Liability
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>AttendX shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use or inability to use the platform, even if AttendX has been advised of the possibility of such damages. In no event shall AttendX's total liability exceed the amount paid by you, if any, for accessing or using the platform.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                6. Governing Law
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms shall be resolved exclusively by the courts of [Jurisdiction].</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                7. Changes to Terms
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>AttendX reserves the right to modify or revise these Terms at any time, and such changes will be effective immediately upon posting on this page. Your continued use of the platform after the posting of any revised Terms constitutes your acceptance of the revised Terms.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                8. Contact Us
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:support@attendx.com" className="text-sky-500">support@attendx.com</a>.</p>
            </InfoPagePMetaComponent>
        </InfoPageWrapperComponent>

    )
}