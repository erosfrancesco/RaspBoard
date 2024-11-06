import Input from 'components/input/input';
import './index.scss';
import { AppTextLabel } from 'components/typography';
import socket from '@/socket.store';
import DashboardWidget from '../widget';
import WidgetShellConfig from './config';
import { useShellStore } from './shell.store';

const events = {
    CMD: 'shell.cmd'
}

// TODO: - Check directory
// TODO: - History
export function WidgetShell({ widgetKey, widgetName, ...others } = {}) {
    const {
        rootFolder, setRootFolder,
        lastCommand, setLastCommand,
        lastCommandOutput, setCommandOutput
    } = useShellStore();

    const widgetId = widgetName + '-' + widgetKey;

    const handleCommandSend = (command) => {
        socket.emit(events.CMD, { command, rootFolder, widgetId });
        setLastCommand(command);
    }

    const handleCommandOutput = ({ output, widgetId: socketWidgetId }) => {
        if (socketWidgetId === widgetId) {
            setCommandOutput(output);
        }
    }

    /** */
    const cleanup = () => {
        socket.removeListener(events.CMD, handleCommandOutput);
    }

    const resetWidget = (config) => {
        const { rootFolder } = config || {};
        setRootFolder(rootFolder || '/');
    }

    const initializeWidget = (config) => {
        resetWidget(config);
        socket.on(events.CMD, handleCommandOutput);
    }
    /** */


    return <DashboardWidget
        initialize={initializeWidget}
        cleanup={cleanup}
        widgetKey={widgetKey}
        widgetName={widgetName}
        saveConfig={() => ({ rootFolder })}
        loadConfig={resetWidget}
        openConfig={() => <WidgetShellConfig widgetKey={widgetKey} />}
        {...others}>
        <div className='app-widget-cmd'>
            <AppTextLabel>{rootFolder}</AppTextLabel>
            <Input label="Send command" onEnter={handleCommandSend} value={lastCommand} />
            <div className='app-widget-ouput-wrapper'>
                <AppTextLabel>{lastCommandOutput}</AppTextLabel>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetShell;