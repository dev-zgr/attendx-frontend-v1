import {ModalComponent} from "../ModalComponent";
import {Form} from "react-router-dom";


export const InfoModalComponent = ({toggleModal, header, message}) => {
    return (
        <ModalComponent>
            <Form method={"DELETE"}>
                <h1 className={"font-semibold leading-7 text-slate-900 text-xl"}>{header}</h1>
                <label htmlFor="username" className=" text-sm font-medium leading-6 text-slate-700">{message} </label>
                <div className="mt-6 flex items-center gap-x-6 justify-end">
                    <button type="button" onClick={toggleModal}
                            className="text-sm font-semibold leading-6 text-slate-900 hover:underline underline-offset-2">Close
                    </button>
                </div>
            </Form>
        </ModalComponent>
    )
}