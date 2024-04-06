import {MainWrapperComponent} from "../../../components/Wrappers/MainWrapperComponent";
import {Form, useActionData, useNavigate} from "react-router-dom";
import {InfoPageH1MetaComponent} from "../../../meta-components/InfoPage/InfoPageH1MetaComponent";
import {TextInputMetaComponent} from "../../../meta-components/form/inputs/TextInputMetaComponent";
import {prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES} from "../../../config/config";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";
import {UIActions} from "../../../store/slices/UISlice";
import {accountActions} from "../../../store/slices/accountDetailsSlice";


export const LoginPage = () => {
    const actionData = useActionData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UISlice = useSelector(state => state.UISlice);
    const accountSlice = useSelector(state => state.accountDetailsSlice);
    useEffect(() => {
        if (actionData?.status === 200) {
            localStorage.setItem("token", actionData.token);
            dispatch(accountActions.loginUser(actionData.account));
            dispatch(UIActions.setOpcode(MODAL_CODES.LOGIN_UI_ACTION_200));
            dispatch(UIActions.showModal());
            setTimeout(() => {
                dispatch(UIActions.hideModal());
                navigate("/");
            }, 2000);
        } else if (actionData?.status === 400) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LOGIN_UI_ACTION_400));
            dispatch(UIActions.showModal());
        } else if (actionData?.status === 500) {
            dispatch(UIActions.setOpcode(MODAL_CODES.LOGIN_UI_ACTION_500));
            dispatch(UIActions.showModal());
        }
    }, [accountSlice, actionData, dispatch, navigate]);


    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }

    return (
        <>
            {
                UISlice.showModal && UISlice.opcode === MODAL_CODES.LOGIN_UI_ACTION_500 &&
                <InfoModalComponent
                    header={"Internal Server Error"}
                    message={"Login failed, please try again later!"}
                    toggleModal={toggleModal}
                />
            }
            {
                UISlice.showModal && UISlice.opcode === MODAL_CODES.LOGIN_UI_ACTION_400 &&
                <InfoModalComponent
                    header={"Invalid Credentials!"}
                    message={"Login failed, please try again!"}
                    toggleModal={toggleModal}
                />
            }
            {
                UISlice.showModal && UISlice.opcode === MODAL_CODES.LOGIN_UI_ACTION_200 &&
                <InfoModalComponent
                    header={"You've Logged in Successfully"}
                    message={"We're redirect you to home page, Welcome!"}
                    toggleModal={toggleModal}
                />

            }
            <MainWrapperComponent>


                <div className={"col-start-3 col-end-7 px-20"}>
                    <Form method={"POST"}
                          className={"col-start-3 col-end-9 border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-10"}>
                        <InfoPageH1MetaComponent>🔓Login</InfoPageH1MetaComponent>
                        <TextInputMetaComponent name={"email"} label={"Email"} type={"text"}
                                                placeholder={"Username"}
                                                validator={() => true}/>
                        <TextInputMetaComponent name={"password"} label={"Password"} type={"password"}
                                                placeholder={"Username"} validator={() => true}/>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                className={"rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>🔐Login
                            </button>
                        </div>
                    </Form>
                </div>

            </MainWrapperComponent>
        </>

    )
}

export async function action({request}) {

    const formData = await request.formData();
    const body = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    const formedUrl = prepareURL(API_CONFIG.ENDPOINTS.LOGIN);


    const response = await fetch(formedUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    let result = {
        status: 0,
        token: null,
        account: null
    }
    const statusCode = response.status;
    if (statusCode === 200) {
        const responseBody = await response.json();
        result.status = 200;
        result.token = responseBody.token;
        result.account = responseBody.user
    } else if (statusCode === 500) {
        result.status = 500;
    } else if (statusCode === 400) {
        result.status = 400;
    }

    return result;
}