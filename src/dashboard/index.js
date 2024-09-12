import { useEffect, useState } from 'react';
import './index.css';
import { useDashboardStore, widgetDefault, widgetMap } from './dashboard.store';
import { useLayoutStore } from 'store/layout.store';
import Menu from 'components/menu';

import Background from './background';

const MenuContent = () => {
    const { addWidget } = useDashboardStore();
    return <div className='app-dashboard-menu-wrapper'> {
        Object.keys(widgetMap).map((name) => {
            return <div key={name} className='app-dashboard-menu-item' onClick={() => addWidget(name)}>{name}</div>;
        })
    } </div>
}


// TODO: - Remove

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
        setMenuContent(<MenuContent />)
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
                    style={{ top, left }} className="app-dashboard-widget" key={i} widgetKey={i + 1}
                />
            })}

            <button className='app-dashboard-save' onClick={onSave}>&#994;</button>
        </div>
    );
}

export default Dashboard;
