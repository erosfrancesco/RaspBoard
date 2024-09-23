import { TextNormal } from 'components/typography';
import './index.css';
import { useState } from 'react';
import { useI2CStore } from './i2c.store';
import socket, { events } from '@/socket.store';
import WidgetI2CConfig from './config';
import DashboardWidget from 'components/widget';


function I2CDatum({ name, value }) {
    const { dataParameters = {} } = useI2CStore();

    const computeValue = () => {
        const { scale = 1, precision = 0, offset = 0 } = dataParameters[name] || {};
        return (Number(offset) + (Number(value) / Number(scale))).toFixed(precision)
    };


    return <div className='app-widget-i2c-datum'>
        <TextNormal>{name}:</TextNormal>
        <TextNormal>{computeValue()}</TextNormal>
    </div>
}

export function WidgetI2C({ widgetKey, widgetName, ...others } = {}) {
    const {
        address, readEvery, dataMap, dataParameters,
        setDeviceAddress, setReadInterval, setDataMap, initializeDataParameters

    } = useI2CStore();
    const [data, setData] = useState({});

    const onDataReceived = (data) => {
        setData(data);
    }

    /** */
    const cleanup = () => {
        socket.removeListener(events.I2C.DATA(), onDataReceived);
    }

    const initializeWidget = (config) => {
        resetWidget(config);
        socket.on(events.I2C.DATA(), onDataReceived);

        // TESTS
        setInterval(() => {
            onDataReceived({
                'accelX': 0.00004 + (Math.random() / 10000),	     // Accelerometer registers
                'accelY': 0.00004 + (Math.random() / 10000),	     //
                'accelZ': 0.00004 + (Math.random() / 10000),	     //
                'temp': 41 + (Math.random() + (Math.random() * 10)),	     //	Temperature registers
                'gyroX': 0.43 + (Math.random()),	     // Gyroscope registers
                'gyroY': 0.45 + (Math.random()),	     //
                'gyroZ': 0.47 + (Math.random()), 	     //    
            });
        }, 2000);
        /** */
    };

    const resetWidget = (config) => {
        const {
            address, readEvery, dataMap, dataParameters,
        } = config || {};

        initializeDataParameters(dataParameters);
        setDeviceAddress(address);
        setReadInterval(readEvery);
        setDataMap(dataMap);
    }
    /** */

    return (
        <DashboardWidget
            initialize={initializeWidget}
            cleanup={cleanup}
            widgetKey={widgetKey}
            widgetName={widgetName}
            saveConfig={() => ({ address, readEvery, dataMap, dataParameters })}
            loadConfig={resetWidget}
            openConfig={() => <WidgetI2CConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-widget-i2c'>
                {Object.keys(data).map((name) => {
                    const value = data[name];

                    return <I2CDatum key={name} name={name} value={value} />
                })}
            </div>
        </DashboardWidget>
    );
}

export default WidgetI2C;


