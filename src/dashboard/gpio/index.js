import './index.css';
import { statuses, useGpioStore, writeModes } from './gpio.store';
import DashboardWidget from 'components/widget';
import { useEffect, useState } from 'react';
import WidgetGPIOConfig from './config';
import WidgetGPIOStatus from './status';
import socket, { events } from 'store/socket.store';
import { TextNormal } from 'components/typography';
import Input from 'components/input/input';


export function WidgetGPIOPWM({ widgetKey, ...others }) {
    const [digitalData, setDigitalData] = useState();
    const [pwmData, setPWMData] = useState();
    const [servoData, setServoData] = useState();

    const { pinout, setPinConfig, setPinAttribute } = useGpioStore();
    const {
        status, mode, pin,
        digitalValue, pwmValue,
        servoMin, servoMax, servoStep, servoValue
    } = pinout[widgetKey] || {};

    const isReady = status === statuses.CONNECTED;

    // WIDGET EVENTS
    const onDigitalValueChange = (value) => {
        setPinAttribute(widgetKey, 'digitalValue', value);
        socket.emit(events.PIN_WRITE.EVENT(pin), value);
    }

    const onPWMValueChange = (value) => {
        setPinAttribute(widgetKey, 'pwmValue', value);
        socket.emit(events.PIN_WRITE.EVENT(pin), value);
    }

    const onServoValueChange = (value) => {
        setPinAttribute(widgetKey, 'servoValue', value);
        socket.emit(events.PIN_WRITE.EVENT(pin), value);
    }

    const initializeWidget = (config) => {
        config.status = config.status || statuses.WAITING;
        setPinConfig(widgetKey, config);

        const { pin } = config;

        if (pin) {
            socket.emit(events.PIN_OPEN.EVENT(), { pin });
        }
    }
    //

    // SOCKET EVENT HANDLERS
    const handlePinConnected = () => {
        setPinAttribute(widgetKey, 'status', statuses.CONNECTED);
    };

    const handleIncomingDigitalData = (state) => {
        setDigitalData(Number(state) ? 'HIGH' : 'LOW')
    };

    const handleIncomingPWMData = (state) => {
        setPWMData(Number(state))
    };

    const handleIncomingServoData = (state) => {
        setServoData(Number(state))
    };
    //

    useEffect(() => {
        const config = JSON.parse(localStorage.getItem(widgetKey));
        initializeWidget(config || {});

        // EVENT HANDLERS
        socket.on(events.PIN_WRITE.SUCCESS(pin), handleIncomingDigitalData);
        socket.on(events.PIN_PWM.SUCCESS(pin), handleIncomingPWMData);
        socket.on(events.SERVO_WRITE.SUCCESS(pin), handleIncomingServoData);
        socket.on(events.PIN_OPEN.SUCCESS(pin), handlePinConnected);


        return () => {
            socket.removeListener(events.PIN_OPEN.SUCCESS(pin), handlePinConnected);
            socket.removeListener(events.PIN_WRITE.SUCCESS(pin), handleIncomingDigitalData);
            socket.removeListener(events.PIN_PWM.SUCCESS(pin), handleIncomingPWMData);
            socket.removeListener(events.SERVO_WRITE.SUCCESS(pin), handleIncomingServoData);
        }
        // eslint-disable-next-line
    }, []);


    return (
        <DashboardWidget widgetName={'GPIO - ' + widgetKey}
            widgetKey={widgetKey}
            saveConfig={() => pinout[widgetKey] || {}}
            loadConfig={(config) => initializeWidget(config || {})}
            openConfig={() => <WidgetGPIOConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-widget-gpio-content'>
                <WidgetGPIOStatus status={status} />
                <TextNormal>Mode: {mode}</TextNormal>
                {mode === writeModes[0] && <div className='app-row'>
                    <Input
                        label="Pin Value" type="number" min="0" max="1" step="1"
                        value={digitalValue} onEnter={onDigitalValueChange} disabled={!isReady}
                    />
                    <TextNormal>Status: {digitalData}</TextNormal>
                </div>}

                {mode === writeModes[1] && <div className='app-row'>
                    <Input label="Send PWM"
                        type="number" min="0" max="256" step="1"
                        value={pwmValue} onEnter={onPWMValueChange} disabled={!isReady}
                    />
                    <TextNormal>Status: {pwmData}</TextNormal>
                </div>}

                {mode === writeModes[2] && <div className='app-row'>
                    <Input label="Send Servo Value"
                        type="number" min={servoMin} max={servoMax} step={servoStep}
                        value={servoValue} onEnter={onServoValueChange} disabled={!isReady}
                    />
                    <TextNormal>Status: {servoData}</TextNormal>
                </div>}
            </div>
        </DashboardWidget>
    );
}

export default WidgetGPIOPWM;