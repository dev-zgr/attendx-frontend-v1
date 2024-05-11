import  "./HomePage-Header.css";
export const HomePageMainContentWrapper = ({children}) => {
    return (
        <div className={"max-w-8xl mx-auto px-4 sm:px-6 md:px-8 p-48 home-page"}>
            {
                children
            }
        </div>
    )

}