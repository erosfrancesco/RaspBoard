import { SectionTitle } from 'components/typography';
import { useLayoutStore } from '@/layout.store';
import Button from 'components/input/button';
import './widget.css';
import { useEffect } from 'react';
import socket from '../socket.store';


export function DashboardWidget({
    className,
    children,
    widgetName,
    widgetKey,
    saveConfig,
    loadConfig,
    openConfig,
    initialize = () => { },
    cleanup = () => { },
    ...others
}) {
    const wrapperClassName = 'app-widget' + (className ? " " + className : "");

    const initializeWiget = () => {
        const widgetID = widgetName + ' - ' + widgetKey;
        const config = JSON.parse(localStorage.getItem(widgetID));

        initialize(config || {});
    }

    useEffect(() => {
        // Initialize widget on WS ready
        if (socket.connected) {
            initializeWiget();
        } else {
            socket.on('connected', initializeWiget);
        }

        return () => {
            socket.removeListener('connected', initializeWiget);
            cleanup();
        };
    }, []);

    return (
        <div className={wrapperClassName} {...others}>
            <div className='app-row'>
                <DashboardWidgetActions
                    widgetKey={widgetKey}
                    widgetName={widgetName}
                    saveConfig={saveConfig}
                    loadConfig={loadConfig}
                    openConfig={openConfig}
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
    saveConfig,
    loadConfig,
    openConfig,
}) {
    const { setAlertContent } = useLayoutStore();
    const widgetID = widgetName + ' - ' + widgetKey;

    const save = () => {
        if (saveConfig) {
            const configuration = JSON.stringify(saveConfig());
            localStorage.setItem(widgetID, configuration);
        }
    }

    const load = () => {
        if (loadConfig) {
            const configuration = JSON.parse(localStorage.getItem(widgetID));
            loadConfig(configuration);
        }
    }

    const open = () => {
        if (openConfig) {
            const content = openConfig();
            setAlertContent(content);
        }
    }

    return (
        <div className='app-column app-widget-actions'>
            {openConfig && <Button className='app-widget-action-button' onClick={open}>&#x224E;</Button>}
            {loadConfig && <Button className='app-widget-action-button' onClick={load}>&#x2186;</Button>}
            {saveConfig && <Button className='app-widget-action-button' onClick={save}>&#x21EB;</Button>}
        </div>
    );
}


export default DashboardWidget;