import {InfoPageWrapperComponent} from "../../../components/Wrappers/InfoPageWrapperComponent";
import {InfoPageH1MetaComponent} from "../../../meta-components/InfoPage/InfoPageH1MetaComponent";
import {InfoPageH2MetaComponent} from "../../../meta-components/InfoPage/InfoPageH2MetaComponent";
import {InfoPagePMetaComponent} from "../../../meta-components/InfoPage/InfoPagePMetaComponent";

export const PrivacyPolicyPage = () => {
    return (

        <InfoPageWrapperComponent>
            <InfoPageH1MetaComponent>
                Privacy Policy
            </InfoPageH1MetaComponent>
            <InfoPageH2MetaComponent>
                1. Information We Collect:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <ol>
                    <li><strong>Personal Information:</strong> We may collect personal information such as your name, email
                        address, phone number, and other contact details when you register an account with
                        AttendX.
                    </li>
                    <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our
                        services, including your IP address, device information, browser type, and usage
                        patterns.
                    </li>
                    <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your user
                        experience and analyze usage trends.
                    </li>
                </ol>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                2. How We Use Your Information:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We may use the information we collect for various purposes, including:</p>
                <ul>
                    <li>To provide, maintain, and improve our services.</li>
                    <li>To personalize your experience and offer tailored content.</li>
                    <li>To communicate with you, including sending promotional materials and updates.</li>
                    <li>To analyze usage patterns and trends to enhance our services.</li>
                    <li>To comply with legal obligations and resolve disputes.</li>
                </ul>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                3. Data Sharing and Disclosure:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We may share your information with third parties under certain circumstances, including:</p>
                <ul>
                    <li>With service providers and business partners who assist us in providing our services.</li>
                    <li>With law enforcement or regulatory authorities in response to legal requests or to protect our rights.</li>
                    <li>In connection with a business transaction, such as a merger, acquisition, or sale of assets.</li>
                    <li>With your consent or at your direction.</li>
                </ul>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                4. Data Retention:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We will retain your information for as long as necessary to fulfill the purposes outlined in this privacy
                    policy, unless a longer retention period is required or permitted by law.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                5. Security:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We take reasonable measures to protect your information from unauthorized access, alteration, disclosure,
                    or destruction. However, no method of transmission over the internet or electronic storage is completely
                    secure, so we cannot guarantee absolute security.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                6. Your Rights:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>You have certain rights regarding your personal information, including:</p>
                <ul>
                    <li>The right to access, update, or delete your information.</li>
                    <li>The right to object to the processing of your information.</li>
                    <li>The right to restrict the processing of your information.</li>
                    <li>The right to data portability.</li>
                    <li>The right to withdraw consent.</li>
                </ul>
                <p>Please contact us if you wish to exercise any of these rights.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                7. Changes to This Privacy Policy:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We may update this privacy policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
                    privacy policy on this page.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                8. Contact Us:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>If you have any questions or concerns about this privacy policy, please contact us at
                     <a href={"mailto:support@attendx.com"} className={"text-sky-500"}> support@attendx.com</a>.</p>
            </InfoPagePMetaComponent>
        </InfoPageWrapperComponent>


    )
}