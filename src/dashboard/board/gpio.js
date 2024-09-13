import './index.css';

import { statuses, useGpioStore } from 'store/gpio.store';
import Input from 'components/input/input';
import { useEffect, useState } from 'react';
import { SectionTitle, TextNormal } from 'components/typography';
import { DeleteButton } from 'components/input/button';


/** */
function WidgetBoardServoPinStatus({ pin }) {
    const { connections } = useGpioStore();
    const status = connections[pin];
    const isReady = status === statuses.CONNECTED;
    const isWaiting = status === statuses.WAITING;
    const classNames = 'app-widget-board-pin-status' + (isReady ? ' isReady' : isWaiting ? ' isWaiting' : '');

    return <TextNormal>status: <strong className={classNames}>{connections[pin] || 'Not Found'}</strong></TextNormal>
}

export function WidgetBoardServoPin({ pin }) {
    const [servoInput, setServoInput] = useState();
    const [dataReceived, setDataReceived] = useState();
    const { pinout, connections, writePWMToPin, setupPin } = useGpioStore();
    const isReady = connections[pin] === statuses.CONNECTED;
    const { min = 0, max = 2500, step = 100 } = pinout[pin] || {};
    const sendValue = () => writePWMToPin(pin, servoInput);

    useEffect(() => {
        setupPin(pin,
            (data) => {
                console.log('GPIO', pin, ' data received:', data)
                setDataReceived(data);
            },
            (pin) => {
                console.log('Opened GPIO', pin);
            });
        // eslint-disable-next-line
    }, []);

    return <div className='app-widget-board-pin'>
        <SectionTitle className='app-widget-board-pin-title'>GPIO-{pin}</SectionTitle>
        <div className='app-widget-board-pin-content'>
            <WidgetBoardServoPinStatus pin={pin} />
            <Input label="Servo PWM"
                type="number" min={min} max={max} step={step}
                value={servoInput} onValueChange={setServoInput} onEnter={sendValue}
                disabled={!isReady}
                className="app-input-flat app-widget-board-pin-pwm-input"
            />
            <TextNormal>{dataReceived}</TextNormal>
        </div>
    </div>
}
/** */


/** */
function WidgetBoardPinConfig({ pin }) {
    const { pinout, setupBoardPinout, configPin } = useGpioStore();
    const { min = 0, max = 2500, step = 100 } = pinout[pin] || {};
    const [minInput, setMinInput] = useState(min);
    const [maxInput, setMaxInput] = useState(max);
    const [stepInput, setStepInput] = useState(step);

    useEffect(() => {
        configPin(pin, {
            ...pinout[pin],
            min: minInput,
            max: maxInput,
            step: stepInput
        })
        // eslint-disable-next-line
    }, [minInput, maxInput, stepInput]);

    const removePin = () => {
        const updated = pinout
        delete updated[pin];

        setupBoardPinout(updated);
    }


    return <div key={pin} pin={pin} className='app-widget-board-pin app-widget-board-pin-content'>
        <div className='app-widget-board-pin-title-wrapper'>
            <SectionTitle className='app-widget-board-pin-title'>GPIO-{pin}</SectionTitle>
            <DeleteButton className='app-widget-board-pin-delete' onClick={removePin} />
        </div>

        <div className='app-widget-board-pin-config-wrapper'>
            <Input label="PWM Min"
                type="number" min="0" step="1"
                initialValue={minInput}
                onValueChange={setMinInput}
                className="app-input-flat app-widget-board-pin-pwm-input"
            />
            <Input label="PWM Max"
                type="number" min="0" step="1"
                initialValue={maxInput}
                onValueChange={setMaxInput}
                className="app-input-flat app-widget-board-pin-pwm-input"
            />
            <Input label="PWM Step"
                type="number" min="0" step="1"
                initialValue={stepInput}
                onValueChange={setStepInput}
                className="app-input-flat app-widget-board-pin-pwm-input"
            />
        </div>
    </div>
}

export function WidgetBoardPinoutConfig() {
    const { pinout, configPin } = useGpioStore();
    const [newPinName, setNewPinName] = useState('');

    const pinClassNames = "app-widget-board-config-section";

    const addNewPin = () => {
        configPin(newPinName, {});
        setNewPinName('');
    }

    return <div className='app-widget-board-content'>
        <div className={pinClassNames}>
            {Object.keys(pinout).map(pin => <WidgetBoardPinConfig pin={pin} />)}
            <Input
                className='app-input-flat'
                label="Add new pin"
                onEnter={addNewPin}
                initialValue={newPinName}
                value={newPinName}
                onValueChange={setNewPinName}
            />
        </div>
    </div>
}
/** */


export default WidgetBoardServoPin;