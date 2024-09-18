import { useLayoutStore } from 'store/layout.store';
import './alert.css';
import { DeleteButton } from './input/button';

export function Alert() {
    const { alertIsOpen, setAlertContent, alertContent } = useLayoutStore();
    const classNames = "app-alert-wrapper" + (alertIsOpen ? "" : " app-alert-hide");

    const closeAlert = () => {
        setAlertContent(null);
    }

    return <div className={classNames}>
        <div className='app-alert'>
            <div className='app-alert-content'>
                <DeleteButton className='app-alert-close-button' size="1.4" onClick={closeAlert} />
                {alertContent}
            </div>
        </div>
    </div>
}

export default Alert;