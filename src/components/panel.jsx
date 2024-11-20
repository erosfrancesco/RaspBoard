import { useState } from 'react';
import './panel.scss'


export function Panel({ className, children, show, title, ...args } = {}) {
    const [hideContent, setHideContent] = useState(!show);

    const toggleHide = (e) => {
        e.stopPropagation();
        setHideContent(!hideContent);
    }

    return <div className={"card panel" + (className ? " " + className : "")} {...args}>
        <div className='card-header accordion-header panel-title' onClick={toggleHide}>
            {title} <div className={'panel-title-icon' + (hideContent ? '' : ' show')} />
        </div>
        <div className={"card-body collapse" + (hideContent ? "" : " show")}>
            {children}
        </div>
    </div>
}

export default Panel;
