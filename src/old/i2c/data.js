import './data.css';

import { events, socket } from 'store/socket.store';
import { useI2CStore } from 'store/i2c.store';
import { useEffect, useState } from 'react';
import { TextNormal } from 'components/typography';

/**
 * Data: { [key]: value }
 * 
 * Data rapresentation


    # Temp:
        # Get the actual temperature using the formule given in the
        # MPU-6050 Register Map and Descriptions revision 4.2, page 30
        actual_temp = (raw_temp / 340.0) + 36.53


    # Scale Modifiers
        ACCEL_SCALE_MODIFIER_2G = 16384.0
        ACCEL_SCALE_MODIFIER_4G = 8192.0
        ACCEL_SCALE_MODIFIER_8G = 4096.0
        ACCEL_SCALE_MODIFIER_16G = 2048.0

        GYRO_SCALE_MODIFIER_250DEG = 131.0
        GYRO_SCALE_MODIFIER_500DEG = 65.5
        GYRO_SCALE_MODIFIER_1000DEG = 32.8
        GYRO_SCALE_MODIFIER_2000DEG = 16.4


    # Pre-defined ranges
        ACCEL_RANGE_2G = 0x00
        ACCEL_RANGE_4G = 0x08
        ACCEL_RANGE_8G = 0x10
        ACCEL_RANGE_16G = 0x18

        GYRO_RANGE_250DEG = 0x00
        GYRO_RANGE_500DEG = 0x08
        GYRO_RANGE_1000DEG = 0x10
        GYRO_RANGE_2000DEG = 0x18
 */


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


function I2CData() {
    const [data, setData] = useState({});

    useEffect(() => {
        socket.on(events.I2C.DATA(), setData);
    }, []);

    return (
        <div>
            <TextNormal>I2C Data</TextNormal>

            <div>
                {Object.keys(data).map((name) => {
                    const value = data[name];

                    return <I2CDatum key={name} name={name} value={value} />
                })}
            </div>

        </div>
    );
}

export default I2CData;


