import './index.css';

import { useGpioStore } from 'store/gpio.store';
import WidgetPersistence from 'components/widget';
import { WidgetBoardServoPin, WidgetBoardPinoutConfig } from './gpio';
import WidgetBoardI2C, { WidgetBoardI2CConfig } from './i2c';
import Tabs from 'components/tabs';
import { useLayoutStore } from 'store/layout.store';
import { useEffect } from 'react';
import { useI2CStore } from 'store/i2c.store';


function WidgetBoardConfig() {
    const { setTabContents } = useLayoutStore();

    useEffect(() => {
        setTabContents({
            'GPIO': <WidgetBoardPinoutConfig />,
            'I2C': <WidgetBoardI2CConfig />,
        });
    // eslint-disable-next-line
    }, []);

    return <div className='app-widget-board-config-content'>
        <Tabs />
    </div>
}

function WidgetBoard({ boardName = "Raspberry PI 4", ...others } = {}) {
    const { pinout, setupBoardPinout } = useGpioStore();
    const {
        dataMap, dataParameters, address, readEvery,
        setDataMap, setDataParameters, setDeviceAddress, setReadInterval
    } = useI2CStore();

    return (
        <WidgetPersistence
            widgetName={boardName}
            saveConfig={() => {
                /*
                const pinout = {
                    4: {},
                    18: {}
                };

                const dataMap = {
                    'accelX': '3B',	     // Accelerometer registers
                    'accelY': '3D',	     //
                    'accelZ': '3F',	     //
                    'temp': '41',	     //	Temperature registers
                    'gyroX': '43',	     // Gyroscope registers
                    'gyroY': '45',	     //
                    'gyroZ': '47', 	     //
                };

                const dataParameters = {
                    'accelX': {},
                    'accelY': { precision: 2, scale: 1000 },
                    'accelZ': {},
                    'temp': { offset: 340, precision: 2 },
                    'gyroX': {},
                    'gyroY': {},
                    'gyroZ': {},
                };

                const address = 68;
                const readEvery = 0;
                /** */

                return { pinout, dataMap, dataParameters, address, readEvery }
            }}
            loadConfig={(config) => {
                const { pinout = {}, dataMap = {}, dataParameters = {}, address, readEvery } = config || {};
                // PINOUT
                setupBoardPinout(pinout);

                // I2C
                setDeviceAddress(address);
                setReadInterval(readEvery);
                setDataMap(dataMap);
                Object.keys(dataParameters).forEach((name) => {
                    const value = dataParameters[name];
                    setDataParameters(name, value);
                });
            }}
            openConfig={() => {
                return <WidgetBoardConfig />
            }}
            {...others}
        >

            <div className="app-widget-board-content">
                <div className='app-widget-board-pinout'>
                    {Object.keys(pinout).map(pin => <WidgetBoardServoPin key={pin} pin={pin} />)}
                </div>
                <WidgetBoardI2C className='app-widget-board-i2c' />
            </div>
        </WidgetPersistence>
    );
}

export default WidgetBoard;