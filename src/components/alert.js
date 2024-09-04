import { useLayoutStore } from 'store/layout.store';
import './alert.css';
import Button from './input/button';
import DeleteButton from './deleteButton';

export function Alert() {
    const { alertIsOpen, setAlertContent, alertContent } = useLayoutStore();
    const classNames = "app-alert-wrapper" + (alertIsOpen ? "" : " app-alert-hide");

    const closeAlert = () => {
        setAlertContent(null);
    }

    return <div className={classNames}>
        <div className='app-alert'>
            <div className='app-alert-content'>
                <DeleteButton className='app-alert-close-button' onClick={closeAlert} />
                {alertContent}
            </div>
        </div>
    </div>
}

export default Alert;