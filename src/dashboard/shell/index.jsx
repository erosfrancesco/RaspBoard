import Input from 'components/input/input';
import './index.css';
import { TextNormal } from 'components/typography';
import socket, { events } from '@/socket.store';
import DashboardWidget from 'components/widget';
import WidgetShellConfig from './config';
import { useShellStore } from './shell.store';

// TODO: - History
export function WidgetShell({ widgetKey, widgetName, ...others } = {}) {
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

    const resetWidget = (config) => {
        const { rootFolder } = config || {};
        setRootFolder(rootFolder || '/');
    }

    const initializeWidget = (config) => {
        resetWidget(config);

        socket.on(events.SHELL.OUTPUT(), handleCommandOutput);

        return () => {
            console.log('removing')
            socket.removeListener(events.SHELL.OUTPUT(), handleCommandOutput);
        }
    }
    /** */


    return <DashboardWidget
        initialize={initializeWidget}
        widgetKey={widgetKey}
        widgetName={widgetName}
        saveConfig={() => ({ rootFolder })}
        loadConfig={resetWidget}
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