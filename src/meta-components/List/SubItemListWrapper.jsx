export const SubItemListWrapper = ({children}) => {
    return (
        <ul className={"mt-2 max-h-44 border border-slate-200 rounded-xl divide-y overflow-y-scroll"}>
            {children}
        </ul>

    )
}