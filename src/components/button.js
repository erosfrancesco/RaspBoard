import './button.css'

export function Button({ className, children, ...args } = {}) {
    const classNames = "app app-input app-button app-input-decoration" + (className ? " " + className : "")

    return (
        <button className={classNames} {...args}>{children}</button>
    );
}

export default Button;
