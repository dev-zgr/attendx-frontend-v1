import {useNavigate} from "react-router-dom";

export const SelectMetaComponent = () => {
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        navigate(`?ascending=${event.target.value}`);
    }
    return (

        <li className="flex-grow my-3">
            <select onChange={onChangeHandler}  className="block appearance-none w-full bg-white border border-slate-400 hover:border-sky-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-center">
                <option className="text-center text-slate-700 font-medium" value={true}>Ascending</option>
                <option className="text-center" value={false}>Descending</option>
            </select>
        </li>
    )
}