import { useState } from 'react';
import './expansionPanel.css'
import { TextNormal } from './typography';

function ExpansionPanelIcon({ show = true } = {}) {
    return <div className={'app-panel-title-icon ' + (show ? 'triangle-up' : 'triangle-down')}></div>
}


function ExpansionPanelTitleContainer({ show = true, title = "", ...args } = {}) {
    return <div className='app-panel-title' {...args}>
        <TextNormal>{title}</TextNormal>
        <ExpansionPanelIcon show={show} />
    </div>
}

export function ExpansionPanel({ className, children, show = true, title, ...args } = {}) {
    const [hideContent, setHideContent] = useState(!show);
    const classNames = "app-panel-wrapper" + (className ? " " + className : "");
    const childrenClassNames = "app-panel-content" + (hideContent ? " app-panel-hide" : "");

    const toggleHide = (e) => {
        e.stopPropagation();
        setHideContent(!hideContent);
    }

    return <div className={classNames} {...args}>
        <ExpansionPanelTitleContainer onClick={toggleHide} show={!hideContent} title={title} />
        <div className={childrenClassNames}>{children}</div>
    </div>
}

export default ExpansionPanel;