import { useWidgetStore } from "store/widgets";
import { widgetDefault, widgetMap } from "./widgetConfigs";
import React, { useState } from "react";
import DashboardWidgetConfigs from "./widgetConfigs/content";


export function DashboardWidget({
    children,
    widget,
    ...others
}) {
    const { top, left, label } = widget;
    const [showSettings, setShowSettings] = useState();

    const handleConfigClick = () => {
        setShowSettings(!showSettings)
    }

    return (
        <div style={{
            "display": "flex",
            "flexDirection": "column",
            "position": "absolute",
            top, left,

            "padding": "0.5em",
            "margin": "0.25em",
            "width": 'fit-content',
            "height": 'fit-content',

            "boxShadow": "inset 0 0 0.1em white",
            "borderRadius": "0.4em",
            "backdropFilter": "blur(0.1em)",
            "backgroundColor": "transparent"

        }} {...others}>
            <div className='row'>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <h3>{label}</h3>
                    <h3 className="bi bi-gear-wide-connected btn" onClick={handleConfigClick} />
                </div>
                {showSettings
                    ? <DashboardWidgetConfigs widget={widget} />
                    : React.cloneElement(children, { widget })
                }
            </div>
        </div>
    );
}


export default function DashboardWidgets() {
    const { widgets, setPosition } = useWidgetStore();

    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();

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

    return <div>
        {widgets.map(({ widget: widgetKey, ...widgetProps }, i) => {
            const content = widgetMap[widgetKey] || widgetMap[widgetDefault];
            const widget = { widgetKey: widgetKey || widgetDefault, ...widgetProps, index: i };

            return <DashboardWidget key={i}
                draggable onDragStart={onDragStart} onDragEnd={onDragEnd(i)}
                widget={widget}>
                {content}
            </DashboardWidget>
        })}
    </div>
}