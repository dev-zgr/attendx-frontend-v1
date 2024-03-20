export const SubItemListWrapper = ({children}) => {
    return (
        <ul className={"mt-2 h-50 border border-slate-200 rounded-xl divide-y overflow-y-scroll"}>
            {children}
        </ul>

    )
}