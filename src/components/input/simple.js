import { useEffect, useState } from 'react';
import './input.css'
import { InputLabel } from '../typography';

export function SimpleInput({
    className,
    initialValue, value: v,
    prefix, suffix,
    onChange = () => { }, onEnter = () => { }, onKeyDown = () => { }, onValueChange = () => { },
    ...args
} = {}) {
    const [value, setValue] = useState(initialValue || "");
    const classNames = "app app-input-wrapper" + (className ? " " + className : "")

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
    );
}

export default SimpleInput;