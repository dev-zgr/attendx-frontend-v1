export const InputSectionMetaComponent = ({children}) => {
    return (
        <div className="space-y-12">
            <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {children}
                </div>
            </div>
        </div>
    )
}