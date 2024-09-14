import { Label } from './input';
import './select.css'

export function Select({ className, children, label, onChange = () => { }, onSelected = () => { }, ...args } = {}) {
    const classNames = "app app-input-select" + (className ? " " + className : "")

    return <div>
        <Label>{label}</Label>
        <select className={classNames} onChange={(e) => {
            onSelected(e.target.value);
            onChange(e);
        }} {...args}>
            {children}
        </select>
    </div>

}

export function Option({ className, children, ...args } = {}) {
    const classNames = "app app-input-option" + (className ? " " + className : "")
    return <option className={classNames} {...args}>
        {children}
    </option>
}


export default Select;