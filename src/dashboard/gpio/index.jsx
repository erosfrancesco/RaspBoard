import './index.css';
import { statuses, useGpioStore, writeModes } from './gpio.store';
import socket, { events } from './events.js';
import DashboardWidget from 'components/widget';
import { useState } from 'react';
import WidgetGPIOConfig from './config';
import WidgetGPIOStatus from './status';
import { TextNormal } from 'components/typography';
import Input from 'components/input/input';


export function WidgetGPIO({ widgetKey, widgetName, ...others }) {
    const [digitalData, setDigitalData] = useState();
    const [pwmData, setPWMData] = useState();
    const [servoData, setServoData] = useState();

    const { pinout, setPinConfig, setPinAttribute } = useGpioStore();
    const {
        status, mode, pin,
        digitalValue, pwmValue,
        servoMin, servoMax, servoStep, servoValue
    } = pinout[widgetKey] || {};

    const widgetId = widgetName + '-' + widgetKey;
    const isReady = status === statuses.CONNECTED;

    // WIDGET EVENTS
    const onDigitalValueChange = (value) => {
        setPinAttribute(widgetKey, 'digitalValue', value);
        socket.emit(events.WRITE(pin), value);
    }

    const onPWMValueChange = (value) => {
        setPinAttribute(widgetKey, 'pwmValue', value);
        socket.emit(events.WRITE(pin), value);
    }

    const onServoValueChange = (value) => {
        setPinAttribute(widgetKey, 'servoValue', value);
        socket.emit(events.WRITE(pin), value);
    }

    // SOCKET EVENT HANDLERS
    const handlePinConnected = ({ pin: socketPin, widgetId: socketWidgetId }) => {
        if (!(pin === socketPin && widgetId === socketWidgetId)) {
            return;
        }

        console.log('CONNECTED TO ', pin);
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

    /** */
    const cleanup = () => {
        socket.removeListener(events.OPEN, handlePinConnected);
        socket.removeListener(events.WRITE(pin), handleIncomingDigitalData);
        socket.removeListener(events.PWM(pin), handleIncomingPWMData);
        socket.removeListener(events.SERVO(pin), handleIncomingServoData);
    }

    const resetWidget = (config = {}) => {
        config.status = config.status || statuses.WAITING;
        setPinConfig(widgetKey, config);

        const { pin } = config;

        if (pin) {
            socket.emit(events.OPEN, { pin, widgetId });
        }
    }

    const initializeWidget = (config) => {
        resetWidget(config);
        const { pin } = config || {};

        if (pin) {
            socket.on(events.OPEN, handlePinConnected);
            socket.on(events.WRITE(pin), handleIncomingDigitalData);
            socket.on(events.PWM(pin), handleIncomingPWMData);
            socket.on(events.SERVO(pin), handleIncomingServoData);
        }
    }
    /** */

    return (
        <DashboardWidget
            initialize={initializeWidget}
            cleanup={cleanup}
            widgetName={widgetName}
            widgetKey={widgetKey}
            saveConfig={() => pinout[widgetKey] || {}}
            loadConfig={resetWidget}
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

export default WidgetGPIO;