import { SectionTitle, TextNormal } from 'components/typography';
import './index.css';
import { useEffect, useState } from 'react';
import { useI2CStore } from './i2c.store';
// import socket, { events } from '@/socket.store';
import WidgetI2CConfig from './config';
import DashboardWidget from 'components/widget';


function I2CDatum({ name, value }) {
    const { dataParameters } = useI2CStore();

    const computeValue = () => {
        const { scale = 1, precision = 0, offset = 0 } = dataParameters[name] || {};
        return (Number(offset) + (Number(value) / Number(scale))).toFixed(precision)
    };


    return <div className='app-i2c-datum'>
        <TextNormal>{name}:</TextNormal>
        <TextNormal>{computeValue()}</TextNormal>
    </div>
}

export function WidgetI2C({ widgetKey, widgetName, ...others } = {}) {
    const [data, setData] = useState({});

    useEffect(() => {
        // socket.on(events.I2C.DATA(), setData);
        /** */
        setData({
            'accelX': 0.000004,	     // Accelerometer registers
            'accelY': 0.000004,	     //
            'accelZ': 0.000004,	     //
            'temp': 41,	     //	Temperature registers
            'gyroX': 0.43,	     // Gyroscope registers
            'gyroY': 0.45,	     //
            'gyroZ': 0.47, 	     //    
        })
        /** */
    }, []);

    return (
        <DashboardWidget
            widgetKey={widgetKey}
            widgetName={widgetName}
            saveConfig={() => ({ rootFolder })}
            loadConfig={(config) => initializeWidget(config || {})}
            openConfig={() => <WidgetI2CConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-widget-board-content app-widget-board-i2c'>
                <SectionTitle>I2C Data</SectionTitle>
                {Object.keys(data).map((name) => {
                    const value = data[name];

                    return <I2CDatum key={name} name={name} value={value} />
                })}
            </div>
        </DashboardWidget>
    );
}

export default WidgetI2C;


