import { TextNormal } from 'components/typography';
import './index.css';
import { useState } from 'react';
import { useI2CStore } from './i2c.store';
import socket, { events } from './events';
import WidgetI2CConfig from './config';
import DashboardWidget from 'components/widget';

// TODO: - Write config manually

function I2CDatum({ name, value }) {
    const { dataStructure = [] } = useI2CStore();

    const computeValue = () => {
        const datum = dataStructure.find((el) => el.label === name);
        const { scale = 1, precision = 0, offset = 0 } = datum || {}
        return (Number(offset) + (Number(value) / Number(scale))).toFixed(precision)
    };

    return <div className='app-widget-i2c-datum'>
        <TextNormal>{name}:</TextNormal>
        <TextNormal>{computeValue()}</TextNormal>
    </div>
}

export function WidgetI2C({ widgetKey, widgetName, ...others } = {}) {
    const {
        address, readFrequency, dataStructure, deviceSetup,
        setDeviceAddress, setReadFrequency, setDataStructure, setDeviceSetup
    } = useI2CStore();

    const [data, setData] = useState({});

    /** */
    const onDataReceived = (data) => {
        setData(data);
    };


    /** */
    const cleanup = () => {
        socket.removeListener(events.DATA, onDataReceived);
    }

    const initializeWidget = (updatedConfig) => {
        resetWidget(updatedConfig);

        const widgetId = widgetKey + '-' + widgetName;
        const dataStructure = {};
        (updatedConfig.dataStructure || []).forEach(({ label, address }) => {
            dataStructure[label] = address
        });

        const settings = {
            address: updatedConfig.address,
            readFrequency: updatedConfig.readFrequency,
            deviceSetup: updatedConfig.deviceSetup,
            dataStructure, widgetId
        };

        socket.emit(events.STATUS, settings);
        // socket.on(events.STATUS, onSettingsReceived); // update the config?

        socket.on(events.DATA, onDataReceived);
    };

    const resetWidget = (updateConfigs) => {
        setDeviceAddress(updateConfigs.address);
        setReadFrequency(updateConfigs.readFrequency);
        setDataStructure(updateConfigs.dataStructure);
        setDeviceSetup(updateConfigs.deviceSetup || []);
    }
    /** */

    return (
        <DashboardWidget
            initialize={initializeWidget}
            cleanup={cleanup}
            widgetKey={widgetKey}
            widgetName={widgetName}
            saveConfig={() => ({ address, readFrequency, dataStructure, deviceSetup })}
            loadConfig={resetWidget}
            openConfig={() => <WidgetI2CConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-row app-widget-i2c'>
                {Object.keys(data).map((name) => {
                    const value = data[name];
                    return <I2CDatum key={name} name={name} value={value} />
                })}
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


