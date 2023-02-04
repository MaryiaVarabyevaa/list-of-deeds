import {Dispatch} from "react";

interface IInput {
    value: string,
    onChange: Dispatch<any>,
    placeholder: string,
    margin: number,
    type?: string
}

const Input = ({value, onChange, placeholder, margin, type = 'text'}: IInput) => {
    return <input
        className={`border p-2 rounded-md outline-none mb-${margin}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder? placeholder : ''}
        type={type}
    />
}

export default Input;