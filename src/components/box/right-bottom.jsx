import { useState } from 'react';
import './bottom.scss'
import { AppSubtitle2 } from '../typography';

function ExpansionPanelIcon({ show = true } = {}) {
    return <div className={'app-panel-title-icon ' + (show ? 'triangle-up' : 'triangle-down')}></div>
}


function ExpansionPanelTitleContainer({ show = true, title = "", ...args } = {}) {
    return <div className='app-panel-title' {...args}>
        <AppSubtitle2>{title}</AppSubtitle2>
        <ExpansionPanelIcon show={show} />
    </div>
}

export function RightBottom({ className, children, show = true, hide = false, title, ...args } = {}) {
    const [hideContent, setHideContent] = useState(hide || !show);
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

export default RightBottom;