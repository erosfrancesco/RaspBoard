import { TextNormal } from 'components/typography';
import Button from 'components/input/button';
import './index.css';
import { useState } from 'react';
import { useI2CStore } from './i2c.store';
import socket, { events } from '@/socket.store';
import WidgetI2CConfig from './config';
import DashboardWidget from 'components/widget';


function I2CDatum({ name, value }) {
    const { dataParameters = [] } = useI2CStore();

    const computeValue = () => {
        const dataParameter = dataParameters.find((el) => el.label === name);
        const { scale = 1, precision = 0, offset = 0 } = dataParameter || {}
        return (Number(offset) + (Number(value) / Number(scale))).toFixed(precision)
    };

    return <div className='app-widget-i2c-datum'>
        <TextNormal>{name}:</TextNormal>
        <TextNormal>{computeValue()}</TextNormal>
    </div>
}

export function WidgetI2C({ widgetKey, widgetName, ...others } = {}) {
    const {
        address, readEvery, dataParameters, writeConfigs,
        setDeviceAddress, setReadInterval, setDataParameters, setWriteConfigs
    } = useI2CStore();
    const [data, setData] = useState({});
    const [isConfigured, setIsConfigured] = useState(false);

    const onDataReceived = (data) => {
        setData(data);
    }

    const sendConfig = () => {
        console.log('Writing on I2C Configs');
        // Check if writeConfigs is ready and has been wrote.
        // Flag?
        socket.emit(events.I2C.WRITE(), writeConfigs);
    }

    const onI2COpened = () => {
        socket.emit(events.I2C_SETTING.CHECK());
    }

    const onI2CSetupCheck = (setup) => {
        console.log('setup', setup);
        if (!setup) { }
    }

    /** */
    const cleanup = () => {
        // socket.removeListener(events.I2C.DATA(), onDataReceived);
        socket.removeListener(events.I2C_OPEN.SUCCESS(), onI2COpened);
        socket.removeListener(events.I2C_SETTING.CHECK(), onI2CSetupCheck);
        // socket.removeListener(events.I2C_WRITE.SUCCESS(), onI2COpened);
    }

    const initializeWidget = (config) => {
        resetWidget(config);
        // socket.on(events.I2C.DATA(), onDataReceived);
        socket.on(events.I2C_SETTING.CHECK(), onI2CSetupCheck);
        socket.on(events.I2C_OPEN.SUCCESS(), onI2COpened);
        // socket.on(events.I2C_WRITE.SUCCESS(), onI2COpened);
        socket.emit(events.I2C_OPEN.EVENT(), config);
        socket.emit(events.I2C_SETTING.WRITE(), config);


        /*
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
            address, readEvery, dataParameters = [], writeConfigs = []
        } = config || {};

        setDataParameters(dataParameters || []);
        setDeviceAddress(address);
        setReadInterval(readEvery);
        setWriteConfigs(writeConfigs || []);
    }
    /** */

    return (
        <DashboardWidget
            initialize={initializeWidget}
            cleanup={cleanup}
            widgetKey={widgetKey}
            widgetName={widgetName}
            saveConfig={() => ({ address, readEvery, dataParameters, writeConfigs })}
            loadConfig={resetWidget}
            openConfig={() => <WidgetI2CConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-row app-widget-i2c'>
                {Object.keys(data).map((name) => {
                    const value = data[name];
                    return <I2CDatum key={name} name={name} value={value} />
                })}
            </div>
            <div className='app-widget-i2c-actions'>
                <Button onClick={sendConfig}>Write Config</Button>
            </div>
        </DashboardWidget>
    );
}

export default WidgetI2C;


