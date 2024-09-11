import { SectionTitle } from 'components/typography';
import Button from 'components/input/button';
import './widget.css';
import { useState } from 'react';
import { useLayoutStore } from 'store/layout.store';


/**
 * 
 * @param {*} widgetName string - Widget name 
 * @param {*} saveConfig () => config - Widget config save
 * @param {*} loadConfig (config) => void - Widget config load
 * @param {*} openConfig (config) => html - Widget config alert content
 * 
 * @returns 
 */
function WidgetPersistence({
    widgetName = "",
    saveConfig = () => ({}),
    loadConfig = () => { },
    openConfig = () => { },
    className,
    children,
    ...others
}) {
    const { setAlertContent } = useLayoutStore();
    const [showActions, setShowActions] = useState(false);
    const onMouseLeave = () => setShowActions(false);
    const onMouseOver = () => setShowActions(true);
    
    const actionsClassName = 'app-widget-header-wrapper-actions' + (showActions ? "" : " app-widget-header-wrapper-hide");
    const textClassName = 'app-widget-header-wrapper-label' + (showActions ? " app-widget-header-wrapper-hide" : "");
    const wrapperClassName = 'app-widget' + (className ? " " + className : "");

    const save = () => {
        const configuration = JSON.stringify(saveConfig());
        localStorage.setItem(widgetName, configuration);
    }

    const load = () => {
        const configuration = JSON.parse(localStorage.getItem(widgetName));
        loadConfig(configuration);
    }

    const open = () => {
        const content = openConfig();
        setAlertContent(content);
    }


    // load and save functionality.
    return (
        <div className={wrapperClassName} {...others}>
            <div className='app-widget-title' onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>
                <div className={actionsClassName}>
                    <Button className='app-widget-header-wrapper-action-button' onClick={open}>&#x224E;</Button>
                    <Button className='app-widget-header-wrapper-action-button' onClick={load}>&#x2186;</Button>
                    <Button className='app-widget-header-wrapper-action-button' onClick={save}>&#x21EB;</Button>
                </div>
                <div className={textClassName}>
                    <SectionTitle>{widgetName}</SectionTitle>
                </div>
            </div>

            <div className='app-widget-content-wrapper'>
                {children}
            </div>
        </div>
    );
}

export default WidgetPersistence;


