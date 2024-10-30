import { SectionTitle } from 'components/typography';
import { useLayoutStore } from '@/layout.store';
import Button from 'components/input/button';
import './widget.css';
import { useEffect, useState } from 'react';
import socket from '@/socket.store';


export function DashboardWidget({
    className,
    children,
    widgetName,
    widgetKey,
    widgetTitle,
    saveConfig,
    loadConfig,
    openConfig,
    initialize,
    cleanup,
    ...others
}) {
    const wrapperClassName = 'app-widget' + (className ? " " + className : "");
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeWiget = () => {
        // If widget is already configured, return
        if (isInitialized) {
            return;
        }

        const widgetID = widgetName + ' - ' + widgetKey;
        const config = JSON.parse(localStorage.getItem(widgetID));

        initialize && initialize(config || {});
        setIsInitialized(true);
    }

    useEffect(() => {
        // Initialize widget on WS ready
        if (socket.connected) {
            initializeWiget();
        } else {
            socket.once('connect', initializeWiget);
        }

        return () => {
            cleanup && cleanup();
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
                    {widgetTitle ? widgetTitle : <SectionTitle className='app-widget-title'>{widgetName}</SectionTitle>}
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