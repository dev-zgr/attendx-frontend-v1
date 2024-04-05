import {VISIBLE_FOOTER_ITEMS} from "../config/config";
import {FooterButtonMetaComponent} from "./FooterButtonMetaComponent";

export const FooterComponent = () => {
    return (
        <div className={"sticky top-[100vh] px-10 py-6 pt-6 lg:pt-8 bg-white   text-slate-900 font-semibold text-sm leading-6 dark:text-slate-200 border-t border-slate-900/10 z-30  w-full"}>
            <footer>
                <nav className={"flex justify-center"}>
                    <ul  className={"flex flex-row gap-x-8"}>
                        {VISIBLE_FOOTER_ITEMS.map((section, index) => {
                            return <FooterButtonMetaComponent key={index} url={section.path} buttonLabel={section.name}/>
                        })}
                    </ul>
                </nav>
            </footer>
        </div>
    )
}