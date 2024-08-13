import { useEffect, useState } from 'react';
import './input.css'
import { InputLabel } from './typography';

export function Input({
    className,
    initialValue, value: v,
    prefix, suffix,
    onChange = () => { }, onEnter = () => { }, onKeyDown = () => { }, onValueChange = () => { },
    ...args
} = {}) {
    const [value, setValue] = useState(initialValue || v || "");
    const classNames = "app app-input app-input-decoration app-input-content-wrapper" + (className ? " " + className : "")

    useEffect(() => {
        onValueChange(value);
    }, [value]);


    return (
        <div className={classNames}>
            {prefix && <InputLabel>{prefix}</InputLabel>}
            <input
                className="app app-input app-input-decoration"

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
    );
}

export function Label({ className, children, ...args }) {
    const classNames = "app app-input-label" + (className ? " " + className : "");

    return <label className={classNames} {...args}>
        <InputLabel>{children}</InputLabel>
    </label>
}

export function InputWithLabel({ label, className, ...args }) {
    if (label) {
        const classNames = "app app-input-wrapper" + (className ? " " + className : "");

        return <div className={classNames}>
            <Label>{label}</Label>
            <Input {...args} />
        </div>
    }

    return <Input className={className} {...args} />
}

export default InputWithLabel;
