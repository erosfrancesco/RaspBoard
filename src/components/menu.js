import { useLayoutStore } from 'store/layout.store';
import './alert.css';
import DeleteButton from './deleteButton';

export function Menu() {
    const { menuIsOpen, setAlertContent, menuContent } = useLayoutStore();
    const classNames = "app-alert-wrapper" + (alertIsOpen ? "" : " app-alert-hide");

    const closeAlert = () => {
        setAlertContent(null);
    }

    return <div className={classNames}>
        {menuContent}
    </div>
}

export default Menu;