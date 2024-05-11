export const TestimonialMetaComponent = ({header, message, src, alt, left}) => {

    return (
        <div className={"my-16"}>
            <article className={"flex justify-between"}>
                {
                    left ?
                        <>
                            <img className={"max-h-80 translate-x-4 translate-y-12  skew-y-6"} src={src} alt={alt}/>
                            <div className={"basis-1/2 flex flex-col items-center justify-center pt-12"}>

                                <h3 className={"text-4xl font-bold text-cyan-950 drop-shadow-2xl"}>{header}</h3>
                                <p className={"text-2xl text-center semi-bold overflow-x-clip text-cyan-950 drop-shadow-2xl"}>
                                    {message}
                                </p>
                            </div>
                        </> :
                        <>
                            <div className={"basis-1/2 flex flex-col items-center justify-center pt-12"}>

                                <h3 className={"text-4xl font-bold text-cyan-950  justify-center drop-shadow-2xl"}>{header}</h3>
                                <p className={"text-2xl  text-center semi-bold overflow-x-clip text-cyan-950 drop-shadow-2xl"}>
                                    {message}
                                </p>
                            </div>
                            <img className={"max-h-80 -translate-x-4 translate-y-12  -skew-y-6"} src={src} alt={alt}/>
                        </>

                }


            </article>
        </div>
    )
}