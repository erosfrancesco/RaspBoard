import './index.css';
import { TextNormal, TextNormalStrong, SectionTitle } from 'components/typography';
import socket from '@/socket.store';
import DashboardWidget from 'components/widget';
import Button from 'components/input/button';
import { useState } from 'react';


export function WidgetSocket({ widgetKey, widgetName, ...others } = {}) {

    const [active, setActive] = useState();
    const [connected, setConnected] = useState();
    const [disconnected, setDisconnected] = useState();
    const [socketPath, setSocketPath] = useState();

    const resetState = () => {
        const { io, active, disconnected, connected } = socket || {};
        const { path, hostname, port } = ((io || {}).opts || {});
        setActive(active);
        setConnected(connected);
        setDisconnected(disconnected);
        setSocketPath(hostname + ':' + port)
    }


    const { io, active: socketActive, socketDisconnected, connected: socketConnected } = socket || {};
    const { hostname, port } = ((io || {}).opts || {});

    useState(() => {
        resetState();
        console.log(socket)
    }, [socketActive, socketDisconnected, socketConnected, hostname, port]);

    const open = () => {
        socket.connect();
        resetState();
    }
    const close = () => {
        socket.close();
        resetState();
    }

    return <DashboardWidget
        widgetKey={widgetKey}
        widgetName={widgetName}
        widgetTitle={
            <SectionTitle className="app-widget-socket-title">
                Connection
                {active ? <TextNormalStrong>&#128512;</TextNormalStrong> : <TextNormalStrong>&#128531;</TextNormalStrong>}
            </SectionTitle>
        }
        {...others}>
        <div className='app-widget-socket'>
            <div className="app-row">
                <TextNormal>Socket: </TextNormal>
                <TextNormalStrong className={connected ? 'text-green' : 'text-red'}>
                    {disconnected ? 'Disconnected' : 'Connected'}
                </TextNormalStrong>
            </div>

            <TextNormal>{socketPath}</TextNormal>

            <div className='app-widget-socket-actions'>
                <Button disabled={active} onClick={open}>Open</Button>
                <Button disabled={!active} onClick={close}>Close</Button>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetSocket;