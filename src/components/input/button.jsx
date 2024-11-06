import './button.scss'

export function Button({ className, children, ...args } = {}) {
    const classNames = "btn btn-primary app app-input app-button" + (className ? " " + className : "")

    return (
        <button className={classNames} {...args}>{children}</button>
    );
}

export function DeleteButton({ size = 1, style = {}, className, ...other }) {
    const classNames = "app-button-delete" + (className ? " " + className : "");
    const customStyle = {
        height: size + 'em', width: size + 'em',
        fontSize: size + 'em',
        borderRadius: (size / 2) + 'em',
        ...style
    };

    return <Button className={classNames} style={customStyle} {...other}>
        &#x2297;
    </Button>
}

export default Button;