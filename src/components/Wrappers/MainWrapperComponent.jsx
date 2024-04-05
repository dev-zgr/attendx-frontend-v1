export const MainWrapperComponent = ({children}) => {
    return (
        <div className={"grid grid-cols-8 max-w-8xl mx-auto px-4 sm:px-6 md:px-8 my-10"}>
            {children}
        </div>
    )
}