import {Link} from "react-router-dom";

export const SubListListItemMetaComponent = ({to, children, ...rest}) => {
    return (
        <li {...rest} className={"group/item p-1.5  pl-2 flex flex-row justify-between bg-slate-100 hover:bg-slate-200  text-slate-700 font-medium"}>
            {children}
            <Link to={to}>
                <div className="flex invisible mr-1 hover:bg-slate-200 rounded-3xl pt-0.5  group-hover/item:visible items-center">
                    <svg className="inline-block  mt-px h-5 w-5 text-slate-400 transition group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-900" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"></path>
                    </svg>
                </div>
            </Link>
        </li>

    )
}