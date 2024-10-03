import './index.css';
import { TextNormal, TextNormalStrong } from 'components/typography';
import socket from '@/socket.store';
import DashboardWidget from 'components/widget';
import Button from 'components/input/button';
import { useState } from 'react';


export function WidgetSocket({ widgetKey, widgetName, ...others } = {}) {
    const [active, setActive] = useState();
    const [disconnected, setDisconnected] = useState();
    const [socketPath, setSocketPath] = useState();

    const resetState = () => {
        const { io, active, disconnected } = socket || {};
        const { path, hostname, port } = ((io || {}).opts || {});
        setActive(active);
        setDisconnected(disconnected);
        setSocketPath(hostname + ':' + port)
    }

    useState(() => {
        resetState();
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
        {...others}>
        <div className='app-widget-socket'>

            <TextNormalStrong className={active ? 'text-green' : 'text-red'}>
                {active ? 'Active' : disconnected ? 'Disconnected' : 'Closed'}
            </TextNormalStrong>

            <TextNormal>{socketPath}</TextNormal>

            <div className='app-row'>
                <Button disabled={active} onClick={open}>Open</Button>
                <Button disabled={!active} onClick={close}>Close</Button>
            </div>
        </div>
    </DashboardWidget>

}

export default WidgetSocket;