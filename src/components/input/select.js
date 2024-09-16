import './input.css';
import { Label } from './input';

export function Select({ children, label, onChange = () => { }, onSelected = () => { }, ...args } = {}) {
    return <div className='app-column app-select-wrapper'>
        <Label>{label}</Label>
        <div className="app app-stretch-row">
            <select className='app-row' onChange={(e) => {
                onSelected(e.target.value);
                onChange(e);
            }} {...args}>
                {children}
            </select>
        </div>
    </div>
}

export function Option({ children, ...args } = {}) {
    return <option {...args}>
        {children}
    </option>
}


export default Select;