import './index.css';

import Background from './background';
import WidgetPanel from './widgets/panel';
import DashboardWidgets from './widgets/widgets';


function Dashboard({ className }) {
    return (
        <div className={"app-dashboard" + (className ? " " + className : "")}>
            <Background />
            <DashboardWidgets />
            <WidgetPanel />
        </div>
    );
}

export default Dashboard;
