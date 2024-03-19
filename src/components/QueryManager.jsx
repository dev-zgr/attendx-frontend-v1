export const QueryManager = ({children}) => {
    return (
        <aside
            className="fixed p-6 z-20 col-start-1 col-end-3 bg-white border border-slate-200 rounded-3xl overflow-hidden w-[calc(22%)] shadow-xl">
            <nav>
                <ul>
                    {children}
                </ul>
            </nav>
        </aside>
    )
}