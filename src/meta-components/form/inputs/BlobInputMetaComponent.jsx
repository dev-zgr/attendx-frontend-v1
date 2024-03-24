import {useState} from "react";

export const BlobInputMetaComponent = ({name,label,placeholder,validator,value ,...rest}) => {

    const [inputValue, setInputValue] = useState(value ?? "");

    const onChangeHandler = (event) => {
        if (validator(event.target.value)) {
            setInputValue(event.target.value);
        }
    }


    return (
        <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-slate-700">{label}</label>
            <div className="mt-2">
                <textarea id="about" name={name} rows="3" value={inputValue} onChange={onChangeHandler}  {...rest}
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-sm sm:leading-6"></textarea>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{placeholder}</p>
        </div>
    )
}