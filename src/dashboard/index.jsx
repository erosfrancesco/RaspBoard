import './index.css';
import { useLayoutStore } from '@/layout.store';

import Background from './background';
import DashboardConfig from './settings';
import WidgetPanel from './widgets/panel';
import DashboardWidgets from './widgets/widgets';


function Dashboard({ className }) {
    const { setAlertContent } = useLayoutStore();

    const openMenu = (e) => {
        setAlertContent(<DashboardConfig />)
    }

    return (
        <div className={"app-dashboard" + (className ? " " + className : "")}>
            <Background onClick={openMenu} />
            <DashboardWidgets />
            <WidgetPanel />
        </div>
    );
}

export default Dashboard;
