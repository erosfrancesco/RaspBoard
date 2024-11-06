import { useLayoutStore } from '@/layout.store';
import './alert.scss';
import { DeleteButton } from './input/button';

export function Alert() {
    const { alertIsOpen, setAlertContent, alertContent } = useLayoutStore();
    const classNames = "app-alert-wrapper" + (alertIsOpen ? "" : " app-alert-hide");

    const closeAlert = (e) => {
        setAlertContent(null);
    }

    return <div className={classNames} onClick={closeAlert}>
        <div className='app-alert' onClick={e => e.stopPropagation()}>
            <div className='app-alert-content'>
                <DeleteButton className='app-alert-close-button' size="1.4" onClick={closeAlert} />
                {alertContent}
            </div>
        </div>
    </div>
}

export default Alert;