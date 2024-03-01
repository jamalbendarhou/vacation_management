import React from 'react'
import { Field,ErrorMessage } from 'formik';

type Props = {
    forId : string;
    name : string;
    type : string;
    placeholder : string;
    label : string;
}

export default function InputField({
    forId,
    name,
    type,
    placeholder,
    label
}: Props) {
    const inputClassName ="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150";
    return (
        <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={forId}>
                {label}
            </label>
            <Field id={forId} type={type} name={name} className={inputClassName} placeholder={placeholder} />
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-2" />
        </div>
    )
}