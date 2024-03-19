import {Link, NavLink} from "react-router-dom";

export const HeaderButtonMetaComponent = ({url, buttonLabel, ...rest}) => {
    return (
        <li {...rest}>
            <div>
                <NavLink className={ ({isActive}) => {
                    if(isActive){
                        return "text-sky-600 underline underline-offset-2"
                    }else{
                        return "hover:text-sky-400 text-slate-700"
                    }
                }} to={url}>{buttonLabel}</NavLink>
            </div>

        </li>
    )
}