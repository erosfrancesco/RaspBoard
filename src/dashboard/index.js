import { useState } from 'react';
import WidgetBoard from './board';
import WidgetCmd from './cmd';
import './index.css';
import { useDashboardStore } from './dashboard.store';



// TODO: - Widget list
// TODO: - Remove - Add
// TODO: - Check empty config

// TODO: - Dashboard state

function Dashboard({ className = "" }) {
    const { positions, setPosition } = useDashboardStore();
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();

    const onDragStart = (i) => (e) => {
        const { clientX, clientY } = e;
        setOffsetX(clientX);
        setOffsetY(clientY);
    }

    const onDragEnd = (i) => (e) => {
        const { clientX, clientY } = e;

        const left = clientX - offsetX + e.target.offsetLeft;
        const top = clientY - offsetY + e.target.offsetTop;
        e.target.style.top = (top) + 'px';
        e.target.style.left = (left) + 'px';

        setOffsetX(null);
        setOffsetY(null);
        setPosition(i, top, left);
    }

    return (
        <div className={className + " app-dashboard"}>
            <Background />

            <WidgetBoard
                draggable onDragStart={onDragStart(0)} onDragEnd={onDragEnd(0)}
                className='app-dashboard-widget'
                style={positions[0]}
            />

            <WidgetCmd
                draggable onDragStart={onDragStart(1)} onDragEnd={onDragEnd(1)}
                className='app-dashboard-widget'
                style={positions[1]}
            />
        </div>
    );
}

export default Dashboard;



const Hexagon = () => {
    const color1 = 'var(--bg-primary-strong)';
    const color2 = 'var(--bg-primary)';
    const strokeWidth = 7.5;

    return <svg
        width="100%" height="100%"
        style={{
            background: color1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            opacity: 0.6
        }}>
        <defs>
            <pattern id="hexagons"
                width="50" height="43.4"
                patternUnits="userSpaceOnUse"
            >
                <polygon
                    style={{
                        fill: color1,
                        strokeWidth,
                        stroke: color2,
                    }}
                    points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                    id="hex"
                    shapeRendering="geometricPrecision"
                />
                <use xlinkHref="#hex" x="25" />
                <use xlinkHref="#hex" x="-25" />
                <use xlinkHref="#hex" x="12.5" y="-21.7" />
                <use xlinkHref="#hex" x="-12.5" y="-21.7" />
            </pattern>
        </defs>
        <rect
            width="100%" height="100%"
            fill="url(#hexagons)"
        />
    </svg>
}

const Background = () => {
    return <div style={{
        width: '100%',
        height: '100%',
        opacity: 1,
        background: 'radial-gradient(\
            var(--bg-primary) 0%,\
            var(--bg-main) 80%\
        )'
    }}>
        <Hexagon />
    </div>
}