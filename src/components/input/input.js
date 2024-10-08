import { useEffect, useState } from 'react';
import './input.css'
import { InputLabel } from '../typography';

export function Label({ children, ...args }) {
    return <label {...args}>
        <InputLabel>{children}</InputLabel>
    </label>
}

export function Input({
    className,
    initialValue, value: v,
    prefix, suffix, label,
    onChange = () => { }, onEnter = () => { }, onKeyDown = () => { }, onValueChange = () => { },
    ...args
} = {}) {
    const [value, setValue] = useState(initialValue || "");
    const classNames = "app app-input-wrapper" + (className ? " " + className : "");

    useEffect(() => {
        onValueChange(value);
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        if (v !== undefined && v !== null) {
            setValue(v);
        }
    }, [v]);

    return (
        <div className={classNames}>
            <Label>{label}</Label>
            <div className="app app-input-wrapper">
                {prefix && <InputLabel>{prefix}</InputLabel>}
                <input className="app app-stretch-row"
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
            </div>
        </div>
    );
}

export default Input;
