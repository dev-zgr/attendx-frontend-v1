import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addParametersToURL, prepareURL} from "../../../utilityFunctions/apiHandling";
import {API_CONFIG, MODAL_CODES} from "../../../config/config";
import {accountActions} from "../../../store/slices/accountDetailsSlice";
import {UIActions} from "../../../store/slices/UISlice";
import {InfoModalComponent} from "../../../components/modals/InfoModalComponent";

export const LogoutPage = () => {
    const UIState = useSelector(state => state.UISlice);
    useSelector(state => state.UISlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const logOutHandler = async () => {
            const token = localStorage.getItem("token") || "";
            if (token) {
                const preparedUrl = addParametersToURL(prepareURL(API_CONFIG.ENDPOINTS.LOGIN),{token: token})
                const response  = await fetch(preparedUrl,
                    {
                        method: "DELETE",
                    });
                if(response.status === 202){
                    dispatch(accountActions.logout())
                    localStorage.removeItem("token")
                    dispatch(UIActions.setOpcode(MODAL_CODES.LOGOUT_ACTION_202));
                    dispatch(UIActions.showModal());
                    setTimeout(() => {
                        dispatch(UIActions.hideModal());
                        navigate("..");
                    }, 2000);
                }else if(response.status === 404){
                    dispatch(UIActions.setOpcode(MODAL_CODES.LOGOUT_ACTION_404));
                    dispatch(UIActions.showModal());
                }else if(response.status === 417){
                    dispatch(UIActions.setOpcode(MODAL_CODES.LOGOUT_ACTION_417));
                    dispatch(UIActions.showModal());
                }else if(response.status === 500){
                    dispatch(UIActions.setOpcode(MODAL_CODES.LOGOUT_ACTION_500));
                    dispatch(UIActions.showModal());
                }
            }
        }
        logOutHandler();

    }, [dispatch, navigate]);


    const toggleModal = () => {
        dispatch(UIActions.hideModal());
    }

    return (
        <>
            {UIState.showModal && (
                <>
                    {UIState.opcode === MODAL_CODES.LOGOUT_ACTION_202 && (
                        <InfoModalComponent
                            header={"Logout Successful"}
                            message={"You have been successfully logged out."}
                            toggleModal={toggleModal}
                        />
                    )}

                    {UIState.opcode === MODAL_CODES.LOGOUT_ACTION_404 && (
                        <InfoModalComponent
                            header={"Logout Error"}
                            message={"Oops! We couldn't find the logout endpoint. Please try again later."}
                            toggleModal={toggleModal}
                        />
                    )}

                    {UIState.opcode === MODAL_CODES.LOGOUT_ACTION_417 && (
                        <InfoModalComponent
                            header={"Logout Failed"}
                            message={"Sorry, we encountered an unexpected issue while logging you out. Please try again later."}
                            toggleModal={toggleModal}
                        />
                    )}

                    {UIState.opcode === MODAL_CODES.LOGOUT_ACTION_500 && (
                        <InfoModalComponent
                            header={"Server Error"}
                            message={"Oops! Something went wrong on our end. Please try again later."}
                            toggleModal={toggleModal}
                        />
                    )}
                </>
            )}
        </>

    )
}