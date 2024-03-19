
export const ListWrapperComponent = ({children}) => {
    return (

            <ul className="divide-y  col-start-3 col-end-9 border border-slate-200 rounded-3xl overflow-hidden shadow-xl ">
                {children}
            </ul>
    )
}