import {NavLink} from "react-router-dom";

export const FooterButtonMetaComponent = ({url, buttonLabel, ...rest}) => {
    return (
        <li {...rest}>
            <div>
                <NavLink className={ ({isActive}) => {
                    if(isActive){
                        return "text-sky-900 underline underline-offset-2"
                    }else{
                        return "hover:text-sky-700 text-slate-900"
                    }
                }} to={url}>{buttonLabel}</NavLink>
            </div>

        </li>
    )
}