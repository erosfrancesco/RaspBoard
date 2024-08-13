import { useState } from 'react';
import './container.css'
import { TextNormal } from './typography';

export function Container({ className, style, children, show = true, title, ...args } = {}) {
    const [hideContent, setHideContent] = useState(!show);
    const classNames = "app app-container-wrapper" + (className ? " " + className : "");
    const childrenClassNames = "app-container-content" + (hideContent ? " app-container-hide" : "");

    const toggleHide = () => {
        setHideContent(!hideContent)
    }

    return <div className={classNames} {...args}>
        <div onClick={toggleHide} className='app-container-toggle'>
            <TextNormal>{title ? title : hideContent ? "Show" : "Hide"}</TextNormal>
        </div>
        <div className={childrenClassNames}>{children}</div>
    </div>
}

export default Container;