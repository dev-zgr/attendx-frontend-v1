const DEFAULT_USER_ACCOUNT = {
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "phoneNumber": null,
    "role": null,
    "address": {
        "streetFirstLine": null,
        "streetSecondLine": null,
        "city": null,
        "state": null,
        "country": null,
        "zipCode": null
    }
}

export const DATA_LIST_URL_PARAMETERS ={
    page: {name: "page-no", value: 0},
    sort: {name: "ascending", value: true}
}
const ROLE_CONSTANTS = {
    EDITOR: "EDITOR",
    STUDENT: "STUDENT",
    LECTURER: "LECTURER",
}

const STUDENT_VISIBLE_SECTION_ITEMS = [
    {name: "Home", path: "/"},
    {name: "Departments", path: "/department"},
    {name: "Courses", path: "/course"},
];

const LECTURER_VISIBLE_SECTION_ITEMS = [
    ...STUDENT_VISIBLE_SECTION_ITEMS,
    {name: "Students", path: "/student"},
];

const EDITOR_VISIBLE_SECTION_ITEMS = [
    ...LECTURER_VISIBLE_SECTION_ITEMS,
    {name: "Lecturers", path: "/lecturer"},
    {name: "Editors", path: "/editor"},
    {name: "AttendX AI✨", path: "/ai"},
];

const VISIBLE_MENU_ITEMS = {
    loggedIn: {
        sections:{
            student: STUDENT_VISIBLE_SECTION_ITEMS,
            lecturer: LECTURER_VISIBLE_SECTION_ITEMS,
            editor: EDITOR_VISIBLE_SECTION_ITEMS
        },
        accountItems: [
            {name: "My account", path: "/account"},
            {name: "Log out", path: "/logout"},
        ]
    },
    loggedOut: {
        sections: [{name: "Home", path: "/"}],
        accountItems: [
            {name: "Log in", path: "/login"},
        ]
    }
};

export const VISIBLE_FOOTER_ITEMS = [
    {name: "About", path: "/about"},
    {name: "Contact", path: "/contact"},
    {name: "Privacy Policy", path: "/privacy"},
    {name: "Terms of Service", path: "/terms"},
];

//TODO add the default values for the user account
const DEFAULT_USER_ACCOUNT_SLICE = {
    isLogged: false,
    userDetails: DEFAULT_USER_ACCOUNT
};

const WATERMARKS = {
    EDITOR: ["👨🏻‍💻","👨🏽‍💻", "👨🏾‍💻"],
    STUDENT: ["👨🏻‍🎓","👨🏽‍🎓", "👨🏾‍🎓"],
    LECTURER: ['👨🏻‍🏫','👨🏽‍🏫', '👨🏾‍🏫'],
    DEPARTMENT: ["🏢","🏬","🏫","🏣"],
    COURSE: ["📚","📖","📔","📒"],
}

const API_CONFIG ={
    BASE_URL: "http://localhost:8080/api",
    VERSION: "/v1",
    ENDPOINTS: {
        DEPARTMENT: "/department",
        COURSE: "/course",
        STUDENT: "/student",
        LECTURER: "/lecturer",
        EDITOR: "/editor",
        ACCOUNT: "/account",
        OPTIONS: "/option",
        LOGIN: "/login"
    }
}
const OPTION_CODES = {
    DEPARTMENT : "DEPT_ALL",
    LECTURER: "LECT_ALL",
}

export const MODAL_CODES = {
    LOGIN_UI_ACTION_400: "UI_ACTION_400",
    LOGIN_UI_ACTION_500: "UI_ACTION_500",
    LOGIN_UI_ACTION_200 : "UI_ACTION_200",
    DEPARTMENT_ADD_ACTION_201: "DEPARTMENT_ADD_ACTION_201",
    DEPARTMENT_ADD_ACTION_400: "DEPARTMENT_ADD_ACTION_400",
    DEPARTMENT_ADD_ACTION_500: "DEPARTMENT_ADD_ACTION_500",
    EDITOR_ADD_ACTION_201: "EDITOR_ADD_ACTION_201",
    EDITOR_ADD_ACTION_400: "EDITOR_ADD_ACTION_400",
    EDITOR_ADD_ACTION_500: "EDITOR_ADD_ACTION_500",
    ACCOUNT_UPDATE_202: "ACCOUNT_UPDATE_202",
    ACCOUNT_UPDATE_ACTION_500: "ACCOUNT_UPDATE_ACTION_500",
    ACCOUNT_UPDATE_ACTION_400 : "ACCOUNT_UPDATE_ACTION_400",
    ACCOUNT_UPDATE_ACTION_404 : "ACCOUNT_UPDATE_ACTION_404",
    ACCOUNT_UPDATE_ACTION_417 : "ACCOUNT_UPDATE_ACTION_417",
    LOGOUT_ACTION_202: "LOGOUT_ACTION_202",
    LOGOUT_ACTION_500: "LOGOUT_ACTION_500",
    LOGOUT_ACTION_404: "LOGOUT_ACTION_404",
    LOGOUT_ACTION_417: "LOGOUT_ACTION_417",





}

export {DEFAULT_USER_ACCOUNT, DEFAULT_USER_ACCOUNT_SLICE,VISIBLE_MENU_ITEMS,ROLE_CONSTANTS,API_CONFIG,WATERMARKS, OPTION_CODES};
