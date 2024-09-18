import { useI2CStore } from 'store/i2c.store';
import { events, socket } from './socket.store';

import { useEffect } from 'react';


function Tests() {
    const { setDeviceAddress, setReadInterval, setDataMap } = useI2CStore();

    useEffect(() => {
        // OPEN
        setDeviceAddress(68);

        socket.on(events.I2C_OPEN.SUCCESS(), () => {
            console.log('I2C Ready');

            // WRITE CONFIGS
            socket.emit(events.I2C.WRITE(), [
                { address: '6B', value: 1 },    // Power Management register
                { address: '19', value: 7 },    // Sample rate register
                { address: '1A', value: 0 },    // Sensor configuration register
                { address: '1B', value: 24 },   // Gyro configuration register
                { address: '38', value: 1 }     // Interrupt register
            ]);

            // SET DATA READ
            setDataMap({
                'accelX': '3B',	     // Accelerometer registers
                'accelY': '3D',	     //
                'accelZ': '3F',	     //
                'temp': '41',	     //	Temperature registers
                'gyroX': '43',	     // Gyroscope registers
                'gyroY': '45',	     //
                'gyroZ': '47', 	     //
            });
            setReadInterval(1000);
            socket.on(events.I2C.DATA(), console.log);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div></div>
    );
}

export default Tests;