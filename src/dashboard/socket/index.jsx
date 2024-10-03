import './index.css';
import { TextNormal, TextNormalStrong, SectionTitle } from 'components/typography';
import socket from '@/socket.store';
import DashboardWidget from 'components/widget';
import Button from 'components/input/button';
import { useEffect, useState } from 'react';


export function WidgetSocket({ widgetKey, widgetName, ...others } = {}) {

    const [active, setActive] = useState();
    const [connected, setConnected] = useState();
    const [socketPath, setSocketPath] = useState();

    const resetState = () => {
        const { io, active, connected } = socket || {};
        const { hostname, port } = ((io || {}).opts || {});

        setActive(active);
        setConnected(connected);
        setSocketPath(hostname + ':' + port)
    }

    useEffect(() => {
        socket.on('connect', resetState);
        socket.on('disconnect', resetState);

        return () => {
            socket.removeListener('connect', resetState);
            socket.removeListener('disconnect', resetState);
        }
    }, []);



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
            <TextNormal>{socketPath}</TextNormal>
            <TextNormalStrong className={connected ? 'text-green' : 'text-red'}>
                {connected ? 'Connected' : 'Disconnected'}
            </TextNormalStrong>

            <div className='app-widget-socket-actions'>
                <Button disabled={active} onClick={open}>Open</Button>
                <Button disabled={!active} onClick={close}>Close</Button>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetSocket;