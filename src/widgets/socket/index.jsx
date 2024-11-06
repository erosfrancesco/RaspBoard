import './index.scss';
import { AppTextLabel, AppSubtitleCaption, AppSubtitle } from 'components/typography';
import socket from '@/socket.store';
import DashboardWidget from '../widget';
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
            <AppSubtitle className="app-widget-socket-title">
                Connection
                {active ? <AppSubtitleCaption>&#128512;</AppSubtitleCaption> : <AppSubtitleCaption>&#128531;</AppSubtitleCaption>}
            </AppSubtitle>
        }
        {...others}>
        <div className='app-widget-socket'>
            <AppTextLabel>{socketPath}</AppTextLabel>
            <AppSubtitleCaption className={connected ? 'text-green' : 'text-red'}>
                {connected ? 'Connected' : 'Disconnected'}
            </AppSubtitleCaption>

            <div className='app-widget-socket-actions'>
                <Button disabled={active} onClick={open}>Open</Button>
                <Button disabled={!active} onClick={close}>Close</Button>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetSocket;