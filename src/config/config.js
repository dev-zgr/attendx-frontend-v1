const DEFAULT_USER_ACCOUNT = {
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "phoneNumber": null,
    "role": "EDITOR",
    "address": {
        "streetFirstLine": null,
        "streetSecondLine": null,
        "city": null,
        "state": null,
        "country": null,
        "zipCode": null
    }
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

// const VISIBLE_ACCOUNT_MENU_ITEMS = {
//     loggedIn: [
//         {name: "My account", path: "/account"},
//         {name: "Log out", path: "/logout"},
//     ],
//     loggedOut: [
//         {name: "Log in", path: "/login"},
//     ]
// };

const DEFAULT_USER_ACCOUNT_SLICE = {
    isLogged: true,
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
        OPTIONS: "/option"
    }
}
const OPTION_CODES = {
    DEPARTMENT : "DEPT_ALL",
    LECTURER: "LECT_ALL",
}

export {DEFAULT_USER_ACCOUNT, DEFAULT_USER_ACCOUNT_SLICE,VISIBLE_MENU_ITEMS,ROLE_CONSTANTS,API_CONFIG,WATERMARKS, OPTION_CODES};
