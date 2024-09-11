import './deleteButton.css'
import Button from './input/button';

export function DeleteButton({ onClick, className }) {
    const classNames = "app-button-delete" + (className ? " " + className : "");
    return <Button className={classNames} onClick={onClick}>
        &#x2297;
    </Button>
}

export default DeleteButton;