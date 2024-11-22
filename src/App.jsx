import Background from "./background";
import BoardPanel from "./panel.board";
import WidgetPanel from './panel.widgets';
import DashboardWidgets from "./widgets";


// import Showcase from "./showcase";

export default function App() {
    return <div>
        <Background />
        <DashboardWidgets />
        {/*}
        <div style={{ position: 'relative' }}>
            <Showcase />
        </div>
        {/** */}
        <BoardPanel />
        <WidgetPanel />
    </div>
}