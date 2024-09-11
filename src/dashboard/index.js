import { useEffect, useState } from 'react';
import './index.css';
import { useDashboardStore, widgetDefault, widgetMap } from './dashboard.store';
import { useLayoutStore } from 'store/layout.store';
import Menu from 'components/menu';



// TODO: - Widget list
// TODO: - Remove - Add
// TODO: - Check empty config

// TODO: - Dashboard state

function Dashboard({ className = "" }) {
    const { widgets, loadWidgets, saveWidgets, setPosition } = useDashboardStore();
    const { setMenuContent, setMenuPosition, menuIsOpen } = useLayoutStore();
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();

    useEffect(() => {
        loadWidgets();

        // eslint-disable-next-line
    }, []);

    const onSave = () => {
        saveWidgets();
    }

    const onDragStart = (e) => {
        const { clientX, clientY } = e;
        setOffsetX(clientX);
        setOffsetY(clientY);
    }

    const onDragEnd = (i) => (e) => {
        const { clientX, clientY } = e;

        const left = clientX - offsetX + e.target.offsetLeft - 4;
        const top = clientY - offsetY + e.target.offsetTop - 4;
        e.target.style.top = (top) + 'px';
        e.target.style.left = (left) + 'px';

        setOffsetX(null);
        setOffsetY(null);
        setPosition(i, top, left);
    }

    const openMenu = (e) => {
        e.preventDefault();

        if (menuIsOpen) {
            setMenuContent();
            return;
        }

        const { pageX, pageY } = e;
        setMenuPosition(pageX, pageY);
        setMenuContent(
            <div> Hello menu </div>
        )
    }

    return (
        <div className={"app-dashboard" + (className ? " " + className : "")}>
            <Background onClick={openMenu} />
            <Menu />

            {Object.keys(widgets).map((widgetName, i) => {
                const { top, left, type } = widgets[widgetName];
                const Widget = widgetMap[type] || widgetDefault;

                return <Widget
                    draggable onDragStart={onDragStart} onDragEnd={onDragEnd(widgetName)}
                    style={{ top, left }} className="app-dashboard-widget" key={i}
                />
            })}

            <button className='app-dashboard-save' onClick={onSave}>&#994;</button>
        </div>
    );
}

export default Dashboard;


/** */
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

const Background = ({ style = {}, ...props } = {}) => {
    return <div style={{
        width: '100%',
        height: '100%',
        opacity: 1,
        background: 'radial-gradient( var(--bg-primary) 0%, var(--bg-main) 80%)',
        ...style
    }} {...props}>
        <Hexagon />
    </div>
}