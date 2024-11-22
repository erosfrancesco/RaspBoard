import { useWidgetStore } from "store/widgets";
import { widgetDefault, widgetMap } from "./widgetMap";


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
    const { widgets } = useWidgetStore();

    return <div>
        {widgets.map(({ widget, ...widgetProps }, i) => {
            const content = widgetMap[widget] || widgetDefault;
            
            return <DashboardWidget key={i} {...widgetProps}>
                {content}
            </DashboardWidget>
        })}
    </div>
}