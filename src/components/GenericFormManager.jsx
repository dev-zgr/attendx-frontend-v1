import {Form, useNavigate} from "react-router-dom";

export const GenericFormManager = ({method, children}) => {
    const navigate = useNavigate();

    function cancelHandler() {
        navigate('..');
    }

    return (<Form method={method}
                  className={"col-start-3 col-end-9 border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-10"}>
            {children}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={cancelHandler}
                        className={"text-sm font-semibold leading-6 text-slate-900 hover:underline underline-offset-2"}>
                    Cancel
                </button>
                <button
                    className={"rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Save
                </button>
            </div>

        </Form>)
}