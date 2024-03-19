export const SortingMenuMetaComponent = () => {
    return (
        <div className={"flex items-center space-x-6 p-6 "}>
            <div className={"flex-none rounded-2xl  text-5xl p-4 self-center bg-slate-100"}>Sort</div>
            <div className={"min-w-0 relative flex-auto"}>
                <h2 className={"font-semibold text-slate-900 truncate pr-20"}>Sort by</h2>
                <dl className={"flex flex-wrap text-sm leading-6 font-medium"}>
                    <div className={"flex-none w-full font-normal"}>
                        <dd className={"text-slate-400"}>Sort by name</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}