import { useState } from "react"

export default function WidgetShell() {
    const [rootFolder, setRootFolder] = useState('/');
    const [lastCommand, setLastCommand] = useState('');
    const [lastCommandOutput, setCommandOutput] = useState('cmd output\ncmd output2\ncmd output3\ncmd output4');

    const handleCommandChange = (e) => {
        const value = e.target.value;
        setLastCommand(value);
    }

    const checkSendCommand = (e) => {
        if (e.key !== "Enter") {
            return;
        }

        console.log('Sending', lastCommand);
    }

    /*
    const {
        rootFolder, setRootFolder,
        lastCommand, setLastCommand,
        lastCommandOutput, setCommandOutput
    } = useShellStore();

    /** 
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

    /*
    useEffect(() => {
        const config = JSON.parse(localStorage.getItem(widgetKey));
        console.log('hello config', config, widgetKey)
        initializeWidget(config || {});

        // EVENT HANDLERS
        socket.on(events.SHELL.OUTPUT(), handleCommandOutput);

        return () => {
            socket.removeListener(events.SHELL.OUTPUT(), handleCommandOutput);
        }
        // eslint-disable-next-line
    }, []);
    /** */

    return <div style={{
        minWidth: '16em',
        minHeight: '16em',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1em'
    }}>
        <span>{rootFolder}:</span>
        <input className="form-control" placeholder="Send command:" onChange={handleCommandChange} onKeyUp={checkSendCommand} value={lastCommand} />
        <textarea className="form-control" style={{
            flexGrow: 1
        }} value={lastCommandOutput} readOnly />
    </div>
}
