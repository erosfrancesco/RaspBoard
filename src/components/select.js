import './select.css'

export function Select({ className, children, onChange = () => { }, onSelected = () => { }, ...args } = {}) {
    const classNames = "app app-input app-input-select" + (className ? " " + className : "")
    return <select className={classNames} onChange={(e) => {
        onSelected(e.target.value);
        onChange(e);
    }} {...args}>
        {children}
    </select>
}

export function Option({ className, children, ...args } = {}) {
    const classNames = "app app-input-option" + (className ? " " + className : "")
    return <option className={classNames} {...args}>
        {children}
    </option>
}


export default Select;