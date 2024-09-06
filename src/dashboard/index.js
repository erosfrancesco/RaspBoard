import { useState } from 'react';
import WidgetBoard from './board';
import WidgetCmd from './cmd';
import { Draggable, Droppable } from './draganddrop';
import './index.css';

// TODO: - Drag and drop
// TODO: - Align

const styles = {
    board: {
        top: '30px',
        left: '30px'
    },
    cmd: {
        top: '30px',
        left: '400px'
    }
};

function Dashboard({ className = "" }) {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();

    const onDragStart = (e) => {
        const { clientX, clientY } = e;
        setOffsetX(clientX);
        setOffsetY(clientY);
    }

    const onDragEnd = (e) => {
        const { clientX, clientY } = e;

        const left = clientX - offsetX + e.target.offsetLeft;
        const top = clientY - offsetY + e.target.offsetTop;
        e.target.style.top = (top) + 'px';
        e.target.style.left = (left) + 'px';

        setOffsetX(null)
        setOffsetY(null)
    }

    return (
        <div className={className + " app-dashboard"}>
            <Droppable>
                <div className='app-dashboard-bg app-bg-hexagon'></div>
                <div className='app-dashboard-bg app-bg-light'></div>
                <Draggable onDragStart={onDragStart} onDragEnd={onDragEnd} className='app-dashboard-widget'>
                    <WidgetBoard />
                </Draggable>

                <Draggable onDragStart={onDragStart} onDragEnd={onDragEnd} className='app-dashboard-widget' style={styles.cmd}>
                    <WidgetCmd />
                </Draggable>
            </Droppable>
        </div>
    );
}

export default Dashboard;
