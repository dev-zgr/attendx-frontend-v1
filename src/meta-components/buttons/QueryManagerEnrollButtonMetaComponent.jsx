import {UIActions} from "../../store/slices/UISlice";
import {useDispatch} from "react-redux";
import {MODAL_CODES} from "../../config/config";

export const QueryManagerEnrollButtonMetaComponent = ({label}) => {
    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(UIActions.setOpcode(MODAL_CODES.COURSE_ENROLL_ACTION_MODAL_OPEN));
        dispatch(UIActions.showModal());
    }
    return (
        <li className="flex-grow my-3">
            <button onClick={openModal}
                    className={
                        "w-full flex items-center justify-center rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>
                {label}
            </button>
        </li>
    )
}