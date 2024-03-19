import {Link} from "react-router-dom";

export const ItemCardRedirectMetaComponent = ({label,link}) => {
    return (
        <Link to={link} className={"flex group-hover/item:visible items-center"}>
            <div className="flex invisible hover:bg-slate-200 rounded-3xl  p-8 pt-2 pb-2 group-hover/item:visible items-center ">
                <span className="group-hover/edit: text-gray-700">{label}</span>
                <svg className="inline-block  mt-px h-5 w-5 text-slate-400 transition group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"></path>
                </svg>
            </div>
        </Link>
    )
}