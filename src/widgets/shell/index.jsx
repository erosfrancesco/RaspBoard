import { useState } from "react"

export default function WidgetShell({ ...configs } = {}) {

    console.log('shell', configs);

    // TODO: - where this config?
    const [folder, setFolder] = useState('');
    //
    const [lastCommand, setLastCommand] = useState('');
    const [lastCommandOutput, setCommandOutput] = useState('cmd output\ncmd output2\ncmd output3\ncmd output4');

    const handleCommandChange = (e) => {
        const value = e.target.value;
        setLastCommand(value);
    }

    const handleKeyUp = (e) => {
        if (e.key !== "Enter") {
            return;
        }
        sendCommand()
    }

    /** */
    const sendCommand = () => {
        console.log('Sending', lastCommand);
    }

    // TODO: - Sub and listen?
    const onOutputReceived = (output) => {
        console.log('Received', output);
    }
    /** */

    return <div style={{
        minWidth: '16em',
        minHeight: '16em',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1em'
    }}>
        <span>{folder}:</span>
        <input className="form-control" placeholder="Send command:" onChange={handleCommandChange} onKeyUp={handleKeyUp} value={lastCommand} />
        <textarea className="form-control" style={{
            flexGrow: 1
        }} value={lastCommandOutput} readOnly />
    </div>
}
