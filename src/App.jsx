import Background from "./background";
import Showcase from "./showcase";
import BoardPanel from "./board";
import WidgetPanel from './widgets';

export default function App() {
    return <div>
        <Background />
        <div style={{ position: 'relative' }}>
            <Showcase />
        </div>
        <BoardPanel />
        <WidgetPanel show />
    </div>
}