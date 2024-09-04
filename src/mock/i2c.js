export const mpu6050Data = [
    {
        "accelX": 10429636,
        "accelY": 15192552,
        "accelZ": 3459592,
        "temp": 2096400,
        "gyroX": 2162466,
        "gyroY": 15138531,
        "gyroZ": 16449530
    },
    {
        "accelX": 13312928,
        "accelY": 3134192,
        "accelZ": 10537420,
        "temp": 1047824,
        "gyroX": 2031392,
        "gyroY": 15138534,
        "gyroZ": 16711677
    },
    {
        "accelX": 6497192,
        "accelY": 7328168,
        "accelZ": 4246052,
        "temp": -752,
        "gyroX": 2031392,
        "gyroY": 15335145,
        "gyroZ": 16711426
    },
    {
        "accelX": 9118836,
        "accelY": 11784644,
        "accelZ": 12372452,
        "temp": -736,
        "gyroX": 1900318,
        "gyroY": 15794158,
        "gyroZ": 16646141
    },
    {
        "accelX": 5186400,
        "accelY": 512640,
        "accelZ": 3197684,
        "temp": 2096624,
        "gyroX": 2096926,
        "gyroY": 15466476,
        "gyroZ": 327685
    },
    {
        "accelX": 8856432,
        "accelY": 14406004,
        "accelZ": 576216,
        "temp": -736,
        "gyroX": 1900318,
        "gyroY": 15269863,
        "gyroZ": 16580354
    },
    {
        "accelX": 5710688,
        "accelY": 7590280,
        "accelZ": 13421032,
        "temp": 2096416,
        "gyroX": 1965856,
        "gyroY": 15072997,
        "gyroZ": 16383998
    },
    {
        "accelX": 7807924,
        "accelY": 7590272,
        "accelZ": 10013168,
        "temp": 2096400,
        "gyroX": 1900316,
        "gyroY": 14876389,
        "gyroZ": 16056312
    },
    {
        "accelX": 10167092,
        "accelY": 4444588,
        "accelZ": 12896720,
        "temp": 3144960,
        "gyroX": 2162467,
        "gyroY": 15204329,
        "gyroZ": 393226
    },
    {
        accelX: 10691512,
        accelY: 16241148,
        accelZ: 11848108,
        gyroX: 1834782,
        gyroY: 15072997,
        gyroZ: 16515067,
        temp: -752
    }, {
        accelX: 8332220,
        accelY: 9425548,
        accelZ: 13945208,
        gyroX: 1900315,
        gyroY: 14679778,
        gyroZ: 16187380,
        temp: 1047808
    }
];



export const i2cDataStream = (onData) => {
    let i = 0;
    const dataStreamInterval = setInterval(() => {
        i = i % mpu6050Data.length;
        const datum = mpu6050Data[i]
        onData(datum)
        i++;
    }, 1000);

    return dataStreamInterval;
}

export default i2cDataStream;
