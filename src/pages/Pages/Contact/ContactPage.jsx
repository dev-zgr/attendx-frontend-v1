import {InfoPageH2MetaComponent} from "../../../meta-components/InfoPage/InfoPageH2MetaComponent";
import {InfoPagePMetaComponent} from "../../../meta-components/InfoPage/InfoPagePMetaComponent";
import {InfoPageWrapperComponent} from "../../../components/Wrappers/InfoPageWrapperComponent";
import {InfoPageH1MetaComponent} from "../../../meta-components/InfoPage/InfoPageH1MetaComponent";

export const ContactPage = () => {
    return (
        <InfoPageWrapperComponent>
            <InfoPageH1MetaComponent>
                Contact Us
            </InfoPageH1MetaComponent>
            <InfoPagePMetaComponent>
                <p>If you have any questions, feedback, or concerns, please don't hesitate to reach out to us. Our team is here to assist you.</p>
                <p>You can contact us via email, phone, or by filling out the form below:</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                Email
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p><strong>Email:</strong> <a href="mailto:support@attendx.com" className="text-sky-500">support@attendx.com</a></p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                Phone
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p><strong>Phone:</strong> +1-123-456-7890</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                Contact Form
            </InfoPageH2MetaComponent>
        </InfoPageWrapperComponent>

    )
}