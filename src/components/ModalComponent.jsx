import {createPortal} from "react-dom";
import {BackdropMetaComponent} from "../meta-components/modal/BackdropMetaComponent";
export const ModalComponent = ({children}) => {

        return createPortal(
            <>
                <BackdropMetaComponent/>
                <dialog className={"fixed flex flex-col mt-40 border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-10 z-50 w-1/2 h-auto"} open={true}>
                        {children}
                </dialog>
            </>
             , document.getElementById('modal-root')
        )
    }
