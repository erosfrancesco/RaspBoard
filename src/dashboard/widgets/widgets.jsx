import { useEffect, useState } from 'react';
import './index.css';
import { widgetMap, widgetDefault } from "@/widgets";
import { useDashboardStore } from '../store';


function DashboardWidgets() {
    const { widgets, loadWidgets, setPosition } = useDashboardStore();
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();

    useEffect(() => {
        loadWidgets();
        // eslint-disable-next-line
    }, []);

    const onDragStart = (e) => {
        const { clientX, clientY } = e;
        setOffsetX(clientX);
        setOffsetY(clientY);
    }

    const onDragEnd = (i) => (e) => {
        const { clientX, clientY } = e;

        const left = clientX - offsetX + e.target.offsetLeft - 4;
        const top = clientY - offsetY + e.target.offsetTop - 4;
        e.target.style.top = (top - (top % 10)) + 'px';
        e.target.style.left = (left - (left % 10)) + 'px';

        setOffsetX(null);
        setOffsetY(null);
        setPosition(i, top, left);
    }

    return Object.keys(widgets).map((widgetName, i) => {
        const { top, left, type } = widgets[widgetName];
        const Widget = widgetMap[type] || widgetDefault;

        return <Widget
            draggable onDragStart={onDragStart} onDragEnd={onDragEnd(widgetName)}
            style={{ top, left }} className="app-dashboard-widget"
            key={i} widgetKey={i} widgetName={widgetName}
        />
    })
}

export default DashboardWidgets;