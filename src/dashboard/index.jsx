import './index.scss';

import Background from './background';
import WidgetPanel from './widgets';
import DashboardWidgets from './widgets/widgets';
import TypographyShowCase from '@/components/typography';
import { RightBottom } from '@/components/box';


function Dashboard({ className }) {
    return (
        <div className={"app-dashboard" + (className ? " " + className : "")}>
            {/*}
            <Background />
            <DashboardWidgets />
            {/** */}
            <TypographyShowCase />
            <WidgetPanel />
            <RightBottom>
                hello
            </RightBottom>
        </div>
    );
}

export default Dashboard;
