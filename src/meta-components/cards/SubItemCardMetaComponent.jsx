
export const SubItemCardMetaComponent = ({children, ...rest}) => {
    return (
            <div
                className={"col-span-3 mb-6 mx-3 flex flex-col border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-10 first:ml-0 last:mr-0"}>
                {children}
            </div>
    )
}