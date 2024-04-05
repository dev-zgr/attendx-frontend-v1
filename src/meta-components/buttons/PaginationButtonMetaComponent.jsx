export const PaginationButtonMetaComponent = ({index, label, handlePageChange, selected, ...rest}) => {
    const className = selected ?
        "px-2 py-1.5 font-semibold text-sky-400 underline underline-offset-2" :
        "px-2 py-1.5 font-semibold text-surface hover:text-sky-400 text-slate-900";

    const labelClassName = selected ?
        "underline underline-offset-2 text-sky-400" :
        "";
    return (
        <li className={className} {...rest} onClick={() => {handlePageChange(index)}}>
            <button className={"m-4"}>
                <label className={labelClassName}>
                    {label}
                    </label>
            </button>
        </li>
    )
}