import './App.css';
import {createBrowserRouter, RouterProvider, useLoaderData} from "react-router-dom";
import {RootLayout} from "./pages/Layouts/RootLayout";
import {DepartmentsPage, loader as departmentsLoader} from "./pages/Pages/deparment/DepartmentsPage";
import {action as addDepartmentAction, DepartmentAddPage} from "./pages/Pages/deparment/DepartmentAddPage";
import {DepartmentDetailPage, loader as DepartmentItemLoader} from "./pages/Pages/deparment/DepartmentDetailPage";
import {DepartmentUpdatePage} from "./pages/Pages/deparment/DepartmentUpdatePage";
import {EditorsPage, loader as editorLoader} from "./pages/Pages/editor/EditorsPage";
import {LecturersPage, loader as lecturerLoader} from "./pages/Pages/lecturer/LecturersPage";
import {loader as studentLoader, StudentsPage} from "./pages/Pages/student/StudentsPage";
import {action as addStudentAction, StudentAddPage} from "./pages/Pages/student/StudentAddPage";
import {action as addEditorAction, EditorAddPage} from "./pages/Pages/editor/EditorAddPage";
import {CoursesPage, loader as courseLoader} from "./pages/Pages/course/CoursesPage";
import {
    action as editorDeleteHandler,
    EditorDetailPage,
    loader as editorItemLoader
} from "./pages/Pages/editor/EditorDetailPage";
import {loader as studentItemLoader, StudentDetailPage} from "./pages/Pages/student/StudentDetailPage";
import {action as lecturerAction, LecturerAddPage} from "./pages/Pages/lecturer/LecturerAddPage";
import {action as courseAction, CourseAddPage} from "./pages/Pages/course/CourseAddPage";
import {CourseDetailPage, loader as courseItemLoader} from "./pages/Pages/course/CourseDetailPage";
import {EditorUpdatePage} from "./pages/Pages/editor/EditorUpdatePage";
import {AboutPage} from "./pages/Pages/About/AboutPage";
import {ContactPage} from "./pages/Pages/Contact/ContactPage";
import {PrivacyPolicyPage} from "./pages/Pages/PrivacyPolicy/PrivacyPolicyPage";
import {TermsOfServicePage} from "./pages/Pages/TermsOfService/TermsOfServicePage";
import {ErrorPage} from "./pages/error/ErrorPage";
import {StudentUpdatePage} from "./pages/Pages/student/StudentUpdatePage";
import {LecturerDetailPage, loader as lecturerItemLoader} from "./pages/Pages/lecturer/LecturerDetailPage";
import {CourseUpdatePage} from "./pages/Pages/course/CourseUpdatePage";
import {LecturerUpdatePage} from "./pages/Pages/lecturer/LecturerUpdatePage";
import {LoginPage, action as loginAction} from "./pages/Pages/Login/LoginPage";
import {AccountPage} from "./pages/Pages/account/AccountPage";
import {useEffect} from "react";
import {addParametersToURL, prepareURL} from "./utilityFunctions/apiHandling";
import {API_CONFIG} from "./config/config";
import {useDispatch, useSelector} from "react-redux";
import {accountActions} from "./store/slices/accountDetailsSlice";
import {AccountUpdatePage, action as accountUpdateAction} from "./pages/Pages/account/AccountUpdatePage";
import {LogoutPage} from "./pages/Pages/Logout/LogoutPage";


//Add error element for department
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/department",
                children: [
                    {index: true, element: <DepartmentsPage/>, loader: departmentsLoader},
                    {path: "new", element: <DepartmentAddPage/>, action: addDepartmentAction},
                    {path: ":departmentName", element: <DepartmentDetailPage/>, loader: DepartmentItemLoader},
                    {
                        path: ":departmentName/edit",
                        element: <DepartmentUpdatePage/>,
                        loader: DepartmentItemLoader,
                        action: addDepartmentAction
                    }

                ]
            },
            {
                path: "/editor",
                children: [
                    {index: true, element: <EditorsPage/>, loader: editorLoader},
                    {path: "new", element: <EditorAddPage/>, action: addEditorAction},
                    {path: ":email", element: <EditorDetailPage/>, action: editorDeleteHandler, loader: editorItemLoader},
                    {path: ":email/edit", element: <EditorUpdatePage/>, loader: editorItemLoader, action: addEditorAction
                    },

                ]
            },
            {
                path: "/lecturer",
                children: [
                    {index: true, element: <LecturersPage/>, loader: lecturerLoader},
                    {path: "new", element: <LecturerAddPage/>, action: lecturerAction},
                    {path: ":email", element: <LecturerDetailPage/>, loader: lecturerItemLoader},
                    {path: ":email/edit", element: <LecturerUpdatePage/>},

                ]
            },
            {
                path: "/student",
                children: [
                    {index: true, element: <StudentsPage/>, loader: studentLoader},
                    {path: "new", element: <StudentAddPage/>, action: addStudentAction},
                    {path: ":email", element: <StudentDetailPage/>, loader: studentItemLoader},
                    {path: ":email/edit", element: <StudentUpdatePage/>, loader: studentItemLoader, action: addStudentAction},

                ]
            },
            {
                path: "/course",
                children: [
                    {index: true, element: <CoursesPage/>, loader: courseLoader},
                    {path: "new", element: <CourseAddPage/>, action: courseAction},
                    {path: ":courseCode", element: <CourseDetailPage/>, loader: courseItemLoader},
                    {path: ":email/edit", element: <CourseUpdatePage/>, loader: courseItemLoader, action: courseAction},

                ]
            },
            {
                path: "/account",
                children: [
                    {index: true, element: <AccountPage/>},
                    {path: "edit", element: <AccountUpdatePage/>, action: accountUpdateAction },
                ]
            }
            ,
            {
                path: "/login",
                children: [
                    {index: true, element: <LoginPage/>, action: loginAction},
                ]
            },{
                path: "/logout",
                element: <LogoutPage/>
            }
            ,
            {
                path: "/ai",
                children: [
                    {index: true, element: <div>AI</div>},
                ]
            },
            {
                path: "/about",
                children: [
                    {index: true, element: <AboutPage/>},
                ]
            },
            {
                path: "/contact",
                children: [
                    {index: true, element: <ContactPage/>},
                ]
            },
            {
                path: "/privacy",
                children: [
                    {index: true, element: <PrivacyPolicyPage/>},
                ]
            },
            {
                path: "/terms",
                children: [
                    {index: true, element: <TermsOfServicePage/>},
                ]
            }
        ]
    }
])

/**
 * This function is the entry point for your app.
 * @returns {JSX.Element} -> That renders the directories of the application.
 */
function App() {
    const sessionState = useSelector(state => state.accountDetailsSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        const handler = async () => {
            const token = localStorage.getItem("token") || "";
            if (token) {
                const preparedUrl = addParametersToURL(prepareURL(API_CONFIG.ENDPOINTS.LOGIN),{token: token})
                const response  = await fetch(preparedUrl);
                if(response.status === 200){
                    const body =  await response.json();
                    dispatch(accountActions.loginUser(body))
                }
            }
        }
        handler();

    }, [dispatch]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
