import {HeaderButtonMetaComponent} from "../meta-components/buttons/HeaderButtonMetaComponent";
import {useSelector} from "react-redux";
import {ROLE_CONSTANTS, VISIBLE_MENU_ITEMS} from "../config/config";

export const HeaderComponent = () => {
    const sessionState = useSelector(state => state.accountDetailsSlice);
    let menuSections = VISIBLE_MENU_ITEMS.loggedOut.sections;
    let accountSections = VISIBLE_MENU_ITEMS.loggedOut.accountItems;
    if (sessionState.isLogged && sessionState.userDetails !== null) {
        accountSections = VISIBLE_MENU_ITEMS.loggedIn.accountItems
        switch (sessionState.userDetails.role) {
            case ROLE_CONSTANTS.EDITOR:
                menuSections = VISIBLE_MENU_ITEMS.loggedIn.sections.editor;
                break;
            case ROLE_CONSTANTS.LECTURER:
                menuSections = VISIBLE_MENU_ITEMS.loggedIn.sections.lecturer;
                break;
            case ROLE_CONSTANTS.STUDENT:
                menuSections =VISIBLE_MENU_ITEMS.loggedIn.sections.student;
                break;
            default:
                menuSections = VISIBLE_MENU_ITEMS.loggedOut.sections;
                accountSections = VISIBLE_MENU_ITEMS.loggedOut.accountItems
        }
    }


    return (
        <div className={"sticky top-0 px-10 py-6 pt-6 lg:pt-8  backdrop-blur-2xl text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200 border-b border-slate-900/10 z-30  w-full"}>
            <header className={"flex justify-between"} >
                <nav >
                    <ul className={"flex items-center gap-x-8"}>
                        {menuSections.map((section, index) => {
                            return <HeaderButtonMetaComponent key={index} url={section.path} buttonLabel={section.name}/>
                        })}
                    </ul>
                </nav>
                <nav>
                    <ul className={"flex items-center gap-x-8"}>
                        {
                            accountSections.map((section, index) => {
                                return <HeaderButtonMetaComponent key={index} url={section.path} buttonLabel={section.name}/>
                            })
                        }
                    </ul>
                </nav>
            </header>
        </div>

    )
}