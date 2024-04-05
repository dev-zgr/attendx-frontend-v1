import {PaginationButtonMetaComponent} from "../meta-components/buttons/PaginationButtonMetaComponent";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const PaginationManagerComponent = ({pageCount, urlParameters, setUrlParameters}) => {
    const navigate = useNavigate();
    const currentPage = urlParameters.page?.value || 1;

    let startPage, endPage;
    if (pageCount <= 5) {
        startPage = 1;
        endPage = pageCount;
    } else if (currentPage + 3 < pageCount) {
        if (currentPage < 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 > pageCount) {
            startPage = pageCount - 3;
            endPage = pageCount;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 3;
        }
    } else{
        startPage = pageCount - 4;
        endPage = pageCount;
    }
    const pages = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

    useEffect(() => {
        navigate(`?page-no=${urlParameters.page.value}&ascending=${urlParameters.sort.value}`)
    }, [urlParameters.pageNo, urlParameters.ascending, navigate, urlParameters.page.value, urlParameters.sort.value])
    const handlePageChange = (page) => {
        setUrlParameters((prevState) => {
            return {
                ...prevState,
                page: {...prevState.page, value: page}
            }
        })
    }


    return (
        <div className={"flex justify-center"}>
            <nav className={"flex flex-row"}>
                {pages.map((page, index) => {
                    return (
                        <PaginationButtonMetaComponent
                            label={page}
                            selected={urlParameters.page.value + 1 === page}
                            handlePageChange={() => handlePageChange(page - 1)}
                            key={index}
                        />
                    )
                })}
            </nav>
        </div>
    )
}