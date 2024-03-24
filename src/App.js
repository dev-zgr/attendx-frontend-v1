import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RootLayout} from "./pages/Layouts/RootLayout";
import {DepartmentsPage, loader as departmentsLoader} from "./pages/Pages/deparment/DepartmentsPage";
import {action as addDepartmentAction, DepartmentAddPage} from "./pages/Pages/deparment/DepartmentAddPage";
import {DepartmentDetailPage ,loader as DepartmentItemLoader} from "./pages/Pages/deparment/DepartmentDetailPage";
import {DepartmentUpdatePage} from "./pages/Pages/deparment/DepartmentUpdatePage";
import {EditorsPage, loader as editorLoader} from "./pages/Pages/editor/EditorsPage";
import {LecturersPage, loader as lecturerLoader} from "./pages/Pages/lecturer/LecturersPage";
import {loader as studentLoader, StudentsPage} from "./pages/Pages/student/StudentsPage";
import {action as addStudentAction, StudentAddPage} from "./pages/Pages/student/StudentAddPage";
import {action as addEditorAction, EditorAddPage} from "./pages/Pages/editor/EditorAddPage";
import {CoursesPage, loader as courseLoader} from "./pages/Pages/course/CoursesPage";
import {EditorDetailPage,action as editorDeleteHandler, loader as editorItemLoader} from "./pages/Pages/editor/EditorDetailPage";
import {StudentDetailPage, loader as studentItemLoader} from "./pages/Pages/student/StudentDetailPage";
import {LecturerAddPage, action as lecturerAction} from "./pages/Pages/lecturer/LecturerAddPage";
import {CourseAddPage, action as courseAction} from "./pages/Pages/course/CourseAddPage";
import {CourseDetailPage, loader as courseItemLoader} from "./pages/Pages/course/CourseDetailPage";
import {EditorUpdatePage} from "./pages/Pages/editor/EditorUpdatePage";


//Add error element for department
const router = createBrowserRouter([
    {
        path: "/department",
        element: <RootLayout/>,
        children: [
            {index: true, element: <DepartmentsPage/>, loader: departmentsLoader},
            {path: "new", element: <DepartmentAddPage/>, action: addDepartmentAction},
            {path: ":departmentName", element: <DepartmentDetailPage/>, loader:DepartmentItemLoader},
            {path: ":departmentName/edit", element: <DepartmentUpdatePage/>,loader:DepartmentItemLoader ,action:addDepartmentAction},

        ]
    },
    {
        path: "/editor",
        element: <RootLayout/>,
        children: [
            {index: true, element: <EditorsPage/>, loader: editorLoader},
            {path: "new", element: <EditorAddPage/>, action: addEditorAction},
            {path: ":email", element: <EditorDetailPage/>,action: editorDeleteHandler ,loader: editorItemLoader},
            {path: ":email/edit", element: <EditorUpdatePage/>, action: addEditorAction},

        ]
    },
    {
        path: "/lecturer",
        element: <RootLayout/>,
        children: [
            {index: true, element: <LecturersPage/>, loader: lecturerLoader},
             {path: "new", element: <LecturerAddPage/>, action: lecturerAction}
            // {path: ":email", element: <DepartmentDetailPage/>},
            // {path: ":email/edit", element: <DepartmentUpdatePage/>},

        ]
    },
    {
        path: "/student",
        element: <RootLayout/>,
        children: [
            {index: true, element: <StudentsPage/>, loader: studentLoader},
            {path: "new", element: <StudentAddPage/>, action: addStudentAction},
             {path: ":email", element: <StudentDetailPage/>, loader:studentItemLoader},
            // {path: ":email/edit", element: <DepartmentUpdatePage/>},

        ]
    },
    {
        path: "/course",
        element: <RootLayout/>,
        children: [
            {index: true, element: <CoursesPage/>, loader: courseLoader},
            {path: "new", element: <CourseAddPage/>, action: courseAction},
            {path: ":courseCode", element: <CourseDetailPage/>, loader: courseItemLoader},
            // {path: ":email/edit", element: <DepartmentUpdatePage/>},

        ]
    }
])

/**
 * This function is the entry point for your app.
 * @returns {JSX.Element} -> That renders the directories of the application.
 */
function App() {
    return <RouterProvider router={router}/>;
}

export default App;
