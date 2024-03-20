export const MainGridWrapper = ({children}) => {
    return (
        <div className={"col-start-3 col-end-9"}>
            <div className={"grid grid-cols-6"}>

                {children}
            </div>
        </div>
    )
}