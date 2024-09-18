import Input from 'components/input/input';
import './index.css';
import { TextNormal } from 'components/typography';
import { useEffect } from 'react';
import socket, { events } from 'socket.store';
import DashboardWidget from 'components/widget';
import WidgetShellConfig from './config';
import { useShellStore } from './shell.store';

// TODO: - History
export function WidgetShell({ widgetKey, ...others } = {}) {
    const {
        rootFolder, setRootFolder,
        lastCommand, setLastCommand,
        lastCommandOutput, setCommandOutput
    } = useShellStore();

    /** */
    const handleCommandSend = (command) => {
        socket.emit(events.SHELL.SEND(), { command, rootFolder, widgetKey });
        setLastCommand(command);
    }

    const handleCommandOutput = ({ output, widgetKey: cmdWidgetKey }) => {
        if (cmdWidgetKey === widgetKey) {
            setCommandOutput(output);
        }
    }

    const initializeWidget = (config) => {
        const { rootFolder } = config;
        setRootFolder(rootFolder || '/');
    }
    /** */

    useEffect(() => {
        const config = JSON.parse(localStorage.getItem(widgetKey));
        initializeWidget(config || {});

        // EVENT HANDLERS
        socket.on(events.SHELL.OUTPUT(), handleCommandOutput);

        return () => {
            socket.removeListener(events.SHELL.OUTPUT(), handleCommandOutput);
        }
        // eslint-disable-next-line
    }, []);

    return <DashboardWidget
        saveConfig={() => ({ rootFolder })}
        loadConfig={(config) => initializeWidget(config || {})}
        openConfig={() => <WidgetShellConfig widgetKey={widgetKey} />}
        {...others}>
        <div className='app-widget-cmd'>
            <TextNormal>{rootFolder}</TextNormal>
            <Input label="Send command" onEnter={handleCommandSend} value={lastCommand} />
            <div className='app-widget-ouput-wrapper'>
                <TextNormal>{lastCommandOutput}</TextNormal>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetShell;