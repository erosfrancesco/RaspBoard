import { SectionTitle } from 'components/typography';
import { useLayoutStore } from 'store/layout.store';
import Button from 'components/input/button';
import './widget.css';


export function DashboardWidget({
    className,
    children,
    widgetName,
    widgetKey,
    saveConfig,
    loadConfig,
    openConfig,
    ...others
}) {
    const wrapperClassName = 'app-widget' + (className ? " " + className : "");

    return (
        <div className={wrapperClassName} {...others}>
            <div className='app-row'>
                <DashboardWidgetActions
                    widgetKey={widgetKey}
                    widgetName={widgetName}
                    saveConfig={saveConfig}
                    loadConfig={loadConfig}
                    openConfig={openConfig}
                    {...others}
                />
                <div>
                    <SectionTitle className='app-widget-title'>{widgetName}</SectionTitle>
                    {children}
                </div>
            </div>
        </div>
    );
}


export function DashboardWidgetActions({
    widgetKey = "",
    widgetName = "",
    saveConfig = () => ({}),
    loadConfig = () => { },
    openConfig = () => { },
}) {
    const { setAlertContent } = useLayoutStore();
    const widgetID = widgetName + ' - ' + widgetKey;

    const save = () => {
        const configuration = JSON.stringify(saveConfig());
        localStorage.setItem(widgetID, configuration);
    }

    const load = () => {
        const configuration = JSON.parse(localStorage.getItem(widgetID));
        loadConfig(configuration);
    }

    const open = () => {
        const content = openConfig();
        setAlertContent(content);
    }

    return (
        <div className='app-column app-widget-actions'>
            <Button className='app-widget-action-button' onClick={open}>&#x224E;</Button>
            <Button className='app-widget-action-button' onClick={load}>&#x2186;</Button>
            <Button className='app-widget-action-button' onClick={save}>&#x21EB;</Button>
        </div>
    );
}


export default DashboardWidget;