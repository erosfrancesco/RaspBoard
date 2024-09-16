import Input from 'components/input/input';
import './index.css';
import { TextNormal } from 'components/typography';
// import { useShellStore } from './shell.store';
import { useEffect, useState } from 'react';
import socket, { events } from 'store/socket.store';

// TODO: - History

export function WidgetShell({ widgetKey, className, ...others } = {}) {
    // const { lastCommand, setLastCommand, lastCommandOutput, setCommandOutput } = useShellStore()
    const classNames = "app-widget" + (className ? " " + className : "")

    const [lastCommand, setLastCommand] = useState();
    const [lastCommandOutput, setCommandOutput] = useState();


    const handleCommandSend = (command) => {
        // wait for outputs?
        socket.emit(events.SHELL.SEND(), command);
        setLastCommand(command);
    }
    const handleCommandOutput = ({ command, output }) => {
        console.log(output, command);
        if (command === lastCommand) {
            setCommandOutput(output);
        }
    }

    useEffect(() => {
        // const config = JSON.parse(localStorage.getItem(widgetKey));
        // initializeWidget(config || {});

        // EVENT HANDLERS
        socket.on(events.SHELL.OUTPUT(), handleCommandOutput);

        return () => {
            socket.removeListener(events.SHELL.OUTPUT(), handleCommandOutput);
        }
        // eslint-disable-next-line
    }, []);

    return <div className={classNames} {...others}>
        <div className='app-widget-cmd'>
            <Input label="Send command" onEnter={handleCommandSend} value={lastCommand} />
            <div className='app-widget-ouput-wrapper'>
                <TextNormal>{lastCommandOutput}</TextNormal>
            </div>
        </div>
    </div>

}

export default WidgetShell;