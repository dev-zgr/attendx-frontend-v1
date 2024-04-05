import {InfoPageWrapperComponent} from "../../../components/Wrappers/InfoPageWrapperComponent";
import {InfoPageH1MetaComponent} from "../../../meta-components/InfoPage/InfoPageH1MetaComponent";
import {InfoPageH2MetaComponent} from "../../../meta-components/InfoPage/InfoPageH2MetaComponent";
import {InfoPagePMetaComponent} from "../../../meta-components/InfoPage/InfoPagePMetaComponent";
import React from "react";

export const AboutPage = () => {
    return (
        <InfoPageWrapperComponent>
            <InfoPageH1MetaComponent>
                About AttendX®
            </InfoPageH1MetaComponent>
            <InfoPageH2MetaComponent>
                1. Introduction:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>AttendX is a cutting-edge platform designed to streamline and enhance the management of educational institutions. We offer innovative solutions to optimize administrative processes, improve communication, and facilitate collaboration within educational communities.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                2. Our Mission:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>Our mission at AttendX is to revolutionize the educational landscape by providing intuitive, efficient, and customizable tools that empower educators, administrators, and students.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                3. Our Vision:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>We envision a future where educational institutions worldwide harness the power of technology to foster an engaging, inclusive, and personalized learning experience for all.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                4. Core Values:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>At AttendX, we are guided by the following core values:</p>
                <ul>
                    <li>Innovation: We continuously strive to develop and implement innovative solutions that meet the evolving needs of the education sector.</li>
                    <li>Quality: We are committed to delivering high-quality products and services that exceed the expectations of our users.</li>
                    <li>Collaboration: We believe in the power of collaboration and actively engage with educational institutions, educators, and students to co-create solutions.</li>
                    <li>Accessibility: We are dedicated to ensuring that our platform is accessible to all users, regardless of their background or abilities.</li>
                    <li>Privacy and Security: We prioritize the privacy and security of user data, implementing robust measures to safeguard sensitive information.</li>
                </ul>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                5. Our Team:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>Our team comprises experienced professionals from diverse backgrounds, including education, technology, and business, who share a passion for transforming the educational landscape.</p>
            </InfoPagePMetaComponent>
            <InfoPageH2MetaComponent>
                6. Contact Us:
            </InfoPageH2MetaComponent>
            <InfoPagePMetaComponent>
                <p>If you have any questions or would like to learn more about AttendX, please don't hesitate to contact us at <a href="mailto:support@attendx.com" className="text-sky-500">support@attendx.com</a>.</p>
            </InfoPagePMetaComponent>
        </InfoPageWrapperComponent>

    )
}