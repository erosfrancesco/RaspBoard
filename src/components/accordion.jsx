import { useState } from 'react';
import './panel.scss'


export function Accordion({ className, children, show = true, hide = false, title, ...args } = {}) {
    const [hideContent, setHideContent] = useState(hide || !show);

    const toggleHide = (e) => {
        e.stopPropagation();
        setHideContent(!hideContent);
    }

    return <div className={"panel" + (className ? " " + className : "")} {...args}>
        <div className='accordion-header panel-title' style={{
            background: 'transparent',
            // borderBottom: 'none'
        }} onClick={toggleHide}>
            {title} <div className={'panel-title-icon' + (hideContent ? '' : ' show')} />
        </div>
        <div className={"collapse" + (hideContent ? "" : " show")}>
            {children}
        </div>
    </div>
}

export default Accordion;