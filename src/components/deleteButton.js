import './deleteButton.css'
import Button from './input/button';

export function DeleteButton({ onClick, className }) {
    const classNames = "app-button-delete" + (className ? " " + className : "");
    return <Button className={classNames} onClick={onClick}>
        &#739;
    </Button>
}

export default DeleteButton;