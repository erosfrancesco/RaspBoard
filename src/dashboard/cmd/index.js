import Input from 'components/input/input';
import './index.css';
import { useState } from 'react';
import { TextNormal } from 'components/typography';

// TODO: - Events
// TODO: - History

export function WidgetCmd({ shellName = "Shell", className, ...others } = {}) {
    const [outputCommand, setOutputCommand] = useState('Hello commands output \
        Hello commands output Hello commands output Hello commands output \
        Hello commands output Hello commands output Hello commands output \
    ');

    const sendCommand = (cmd) => {
        console.log(cmd);
    }

    const classNames = "app-widget" + (className ? " " + className : "")
    return <div className={classNames} {...others}>
        <div className='app-widget-cmd'>
            <Input className="app-input-flat" label="Send command" onEnter={sendCommand} />
            <div className='app-widget-ouput-wrapper'>
                <TextNormal>{outputCommand}</TextNormal>
            </div>
        </div>
    </div>

}

export default WidgetCmd;