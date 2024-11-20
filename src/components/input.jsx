import { useEffect, useState } from 'react';

export function Input({
    className,
    initialValue, value: v,
    prefix, suffix, label,
    onChange = () => { }, onEnter = () => { }, onKeyDown = () => { }, onValueChange = () => { },
    ...args
} = {}) {
    const [value, setValue] = useState(initialValue || "");

    useEffect(() => {
        onValueChange(value);
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        if (v !== undefined && v !== null) {
            setValue(v);
        }
    }, [v]);


    return <div className="form-floating">
        <input className="form-control"
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onEnter(e.target.value);
                }

                onKeyDown(e);
            }}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            value={value}
            {...args}
        />
        {label && <label>{label}</label>}
    </div>
}

export default Input;

export function Select({ children, label, onChange = () => { }, onSelected = () => { }, ...args } = {}) {
    return <div className="form-floating">
        <select className="form-control" onChange={(e) => {
            onSelected(e.target.value);
            onChange(e);
        }} {...args}>
            {children}
        </select>
        {label && <label>{label}</label>}
    </div >
}

export function Option({ children, ...args } = {}) {
    return <option {...args}>
        {children}
    </option>
}

