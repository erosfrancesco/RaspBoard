import './widget-deco.css';
import { useLayoutStore } from 'store/layout.store';
import Button from 'components/input/button';


function DashboardWidgetDeco({
    className,
    children,
    ...others
}) {
    const wrapperClassName = 'app-widget' + (className ? " " + className : "");

    // Widget Wrapper
    return (
        <div className={wrapperClassName} {...others}>
            <div className='app-row'>
                <DashboardWidgetActions className="app-row app-widget-header-wrapper-actions" {...others} />
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardWidgetDeco;



export function DashboardWidgetActions({
    widgetKey = "",
    saveConfig = () => ({}),
    loadConfig = () => { },
    openConfig = () => { },
}) {
    const { setAlertContent } = useLayoutStore();

    const save = () => {
        const configuration = JSON.stringify(saveConfig());
        localStorage.setItem(widgetKey, configuration);
    }

    const load = () => {
        const configuration = JSON.parse(localStorage.getItem(widgetKey));
        loadConfig(configuration);
    }

    const open = () => {
        const content = openConfig();
        setAlertContent(content);
    }


    // load and save functionality.
    return (
        <div className='app-column app-widget-actions'>
            <Button className='app-widget-action-button' onClick={open}>&#x224E;</Button>
            <Button className='app-widget-action-button' onClick={load}>&#x2186;</Button>
            <Button className='app-widget-action-button' onClick={save}>&#x21EB;</Button>

            {/*}
            <div className='widget-icon-mask'>
                <WidgetIconsMask />
            </div>
            {/** */}
        </div>
    );
}

/*
function WidgetIconsMask() {
    const strokeColor = "var(--text-main)";
    const strokeWidth = 0.00001;
    const circleSize = 7;
    const viewBox = "0 0 " + (circleSize + strokeWidth + 1) + " " + (4 + (circleSize + strokeWidth) * 6);

    return <svg
        viewBox={viewBox} fill="none"
        style={{
            background: 'transparent',
            backdropFilter: 'blur(0em)'
        }}
        stroke={strokeColor} stroke-width={strokeWidth * 2}>
        <circle cx="0" cy={2 + circleSize + strokeWidth} r={circleSize} fill="none" className='widget-icon-mask-circle'></circle>
        <circle cx="0" cy={2 + (circleSize + strokeWidth) * 3} r={circleSize} fill="none" className='widget-icon-mask-circle'></circle>
        <circle cx="0" cy={2 + (circleSize + strokeWidth) * 5} r={circleSize} fill="none" className='widget-icon-mask-circle'></circle>
    </svg>
}
/* */
