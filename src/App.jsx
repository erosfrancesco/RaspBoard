import Background from "./background";
import Showcase from "./showcase";
import BoardPanel from "./board";

export default function App() {
    return <div>
        <Background />
        <div style={{ position: 'relative' }}>
            <Showcase />
        </div>
        <BoardPanel />
    </div>
}