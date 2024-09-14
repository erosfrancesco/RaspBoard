import './input.css'
import { InputLabel } from '../typography';
import SimpleInput from './simple';

export function Label({ children, ...args }) {
    return <label {...args}>
        <InputLabel>{children}</InputLabel>
    </label>
}

export function Input({ label, className, ...args }) {
    if (label) {
        const classNames = "app app-input-wrapper" + (className ? " " + className : "");

        return <div className={classNames}>
            <Label>{label}</Label>
            <SimpleInput {...args} />
        </div>
    }

    return <SimpleInput className={className} {...args} />
}

export default Input;
