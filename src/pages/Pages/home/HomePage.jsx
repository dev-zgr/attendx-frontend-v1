import HomePageHeader from "../../../meta-components/home/HomePageHeader";
import {HomePageMainContentWrapper} from "../../../meta-components/home/HomePageMainContentWrapper";
import {TestimonialWrapper} from "../../../components/Wrappers/TestimonialWrapper";
import {TestimonialMetaComponent} from "../../../meta-components/testimonial/TestimonialMetaComponent";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <HomePageMainContentWrapper>
                <HomePageHeader prefix={"AttendX"}/>
            </HomePageMainContentWrapper>
            <TestimonialWrapper>
                <TestimonialMetaComponent
                    header={"Departments? We've got 'em."}
                    message={"AttendX is the best platform to manage departments"}
                    src={"assets/images/attendx-departments.png"}
                    alt={"Manage all"}
                    left={false}
                />
                <TestimonialMetaComponent
                    header={"Courses? AttendX has Ayou covered."}
                    message={"AttendX has revolutionized the way we manage course attendance. It's the best platform for online courses."}
                    src={"assets/images/attendx-courses.png"}
                    alt={"Manage all your courses"}
                    left={true}
                />
                <TestimonialMetaComponent
                    header={"Lecturers? AttendX supports them."}
                    message={"As a lecturer, AttendX has simplified attendance management for me. It's the best platform for lecturer-friendly attendance tracking."}
                    src={"assets/images/attendx-lecturers.png"}
                    alt={"Manage all your lecturers"}
                    left={false}
                />
                <TestimonialMetaComponent
                    header={"Students? AttendX is for you."}
                    message={"As a student, AttendX has made attendance tracking hassle-free for me. It's the best platform for student-friendly attendance management."}
                    src={"assets/images/attendx-students.png"}
                    alt={"Manage all your students"}
                    left={true}
                />

            </TestimonialWrapper>
        </>
    )
}