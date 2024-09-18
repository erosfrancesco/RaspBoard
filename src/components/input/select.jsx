import './input.css';
import { Label } from './input';

export function Select({ children, label, onChange = () => { }, onSelected = () => { }, ...args } = {}) {
    return <div className='app-select-wrapper'>
        <Label>{label}</Label>
        <select onChange={(e) => {
            onSelected(e.target.value);
            onChange(e);
        }} {...args}>
            {children}
        </select>
    </div>
}

export function Option({ children, ...args } = {}) {
    return <option {...args}>
        {children}
    </option>
}


export default Select;