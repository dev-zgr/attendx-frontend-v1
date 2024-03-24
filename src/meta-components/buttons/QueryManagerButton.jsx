import {Link} from "react-router-dom";

export const QueryManagerButton = ({to,label}) => {
    return (
        <li className="flex-grow my-3">
            <Link
                to={to}
                className={
                    "w-full flex items-center justify-center rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }
            >
                {label}
            </Link>
        </li>


    )
}
