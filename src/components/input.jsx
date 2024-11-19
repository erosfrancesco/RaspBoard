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


    return (<>
        <div className={"form-group" + (className ? " " + className : "")}>
            <label className="input-group-text" htmlFor="input">{label}</label>

            {/*prefix && <AppTextLabel className="input-group-text">{prefix}</AppTextLabel>/** */}
            {prefix && <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">{prefix}</span>
            </div>}

            <input
                id="input"
                className='form-control'
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
    </>);
}

export default Input;
