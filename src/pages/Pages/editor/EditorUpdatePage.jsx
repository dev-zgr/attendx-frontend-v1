import {useLoaderData} from "react-router-dom";
import {MainWrapperComponent} from "../../../components/MainWrapperComponent";
import {QueryManager} from "../../../components/QueryManager";
import {QueryManagerButton} from "../../../meta-components/buttons/QueryManagerButton";
import {GenericFormManager} from "../../../components/GenericFormManager";
import {SectionHeaderMetaComponent} from "../../../meta-components/form/sections/SectionHeaderMetaComponent";
import {SectionDescriptionMetaComponent} from "../../../meta-components/form/sections/SectionDescriptionMetaComponent";
import {SectionDividerMetaComponent} from "../../../meta-components/form/sections/SectionDividerMetaComponent";

export const EditorUpdatePage = () => {
    const fetchedEditor = useLoaderData();
    return (
        <MainWrapperComponent>
            <QueryManager>
                <QueryManagerButton label={"Back"} to={".."}></QueryManagerButton>
            </QueryManager>
            <GenericFormManager>
                <SectionHeaderMetaComponent header={`Editing: ${fetchedEditor.firstName}  ${fetchedEditor.lastName}`}/>
                <SectionDescriptionMetaComponent
                    description={"You're currently editing the editor. Changes will be permanent after you click save button"}/>

                <SectionDividerMetaComponent/>
            </GenericFormManager>
        </MainWrapperComponent>
    )
}