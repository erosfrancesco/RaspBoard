import { useWidgetStore } from "store/widgets";
import { widgetDefault, widgetMap } from "./widgetMap";
import { useState } from "react";


export function DashboardWidget({
    className,
    children,
    label,
    top, left,
    ...others
}) {
    const wrapperClassName = '' + (className ? " " + className : "");

    return (
        <div className={wrapperClassName} style={{
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
                <div>
                    <h3 style={{
                        "width": 'fit-content',
                        "height": 'fit-content'
                    }}>{label}</h3>
                    {children}
                </div>
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
        {widgets.map(({ widget, ...widgetProps }, i) => {
            const content = widgetMap[widget] || widgetDefault;

            return <DashboardWidget key={i}
                draggable onDragStart={onDragStart} onDragEnd={onDragEnd(i)}
                {...widgetProps}>
                {content}
            </DashboardWidget>
        })}
    </div>
}