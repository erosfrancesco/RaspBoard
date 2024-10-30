import './index.css';
import { useState } from 'react';
import { useI2CStore } from './i2c.store';
import socket, { events } from './events';
import WidgetI2CConfig from './config';
import DashboardWidget from '../widget';
import WidgetI2CDataView from './dataView';

// TODO: - Write config manually
export function WidgetI2C({ widgetKey, widgetName, ...others } = {}) {
    const {
        address, readFrequency, dataSchema, deviceSetup,
        setDeviceAddress, setReadFrequency, setDataSchema, setDeviceSetup
    } = useI2CStore();
    const [data, setData] = useState({});

    const widgetId = widgetName + '-' + widgetKey;

    /** */
    const onDataReceived = (data) => {
        setData(data);
    };


    /** */
    const cleanup = () => {
        console.log('cleaning')
        socket.removeListener(events.DATA, onDataReceived);
    }

    const initializeWidget = (updatedConfig) => {
        resetWidget(updatedConfig);

        const deviceSetup = (updatedConfig.deviceSetup || []).map(({ address, ...item }) => ({ ...item, address: Number('0x' + address) }));

        const dataSchema = {};
        (updatedConfig.dataSchema || []).forEach(({ label, address }) => {
            dataSchema[label] = Number('0x' + address);
        });

        const settings = {
            address: Number('0x' + updatedConfig.address),
            readFrequency: Number(updatedConfig.readFrequency),
            deviceSetup,
            dataSchema,
            widgetId
        };

        console.log('sent configs,', settings);

        socket.emit(events.STATUS, settings);
        socket.on(events.STATUS, (s) => {
            console.log('got configuration:', s)
            // update the config?
            socket.on(events.DATA, onDataReceived);
        });
    };

    const resetWidget = (updateConfigs) => {
        setDeviceAddress(updateConfigs.address);
        setReadFrequency(updateConfigs.readFrequency);
        setDataSchema(updateConfigs.dataSchema);
        setDeviceSetup(updateConfigs.deviceSetup || []);
    }
    /** */

    return (
        <DashboardWidget
            initialize={initializeWidget}
            cleanup={cleanup}
            widgetKey={widgetKey}
            widgetName={widgetName}
            saveConfig={() => ({ address, readFrequency, dataSchema, deviceSetup })}
            loadConfig={resetWidget}
            openConfig={() => <WidgetI2CConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-row app-widget-i2c'>
                <WidgetI2CDataView data={data} />
            </div>
            {/*}
            <div className='app-widget-i2c-actions'>
                <Button onClick={resetI2C}>Write Config</Button>
            </div>
            {/** */}
        </DashboardWidget>
    );
}

export default WidgetI2C;


