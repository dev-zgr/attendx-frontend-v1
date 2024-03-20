export const MainCardWrapper = ({children}) => {

    return (
        <div className={"col-start-3 col-end-9 mb-6 border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-10"}>
            {children}
        </div>
    )
}