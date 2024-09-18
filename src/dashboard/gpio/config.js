import './index.css';
import Input from 'components/input/input';
import { useGpioStore, writeModes } from './gpio.store';
import Select, { Option } from 'components/input/select';
import { TextNormal } from 'components/typography';
import { useEffect } from 'react';

/**
 * pin
 * digital / pwm / servo
 */
export function WidgetGPIOConfig({ widgetKey }) {
    const { pinout, setPinAttribute } = useGpioStore();
    const config = pinout[widgetKey] || {};
    const {
        pin = "", mode,
        digitalValue,
        pwmValue,
        servoMin = 0, servoMax = 2500, servoStep = 100, servoValue
    } = config;

    const onPinChange = (value) => setPinAttribute(widgetKey, 'pin', value);
    const onModeChange = (value) => setPinAttribute(widgetKey, 'mode', value);
    //
    const onDigitalValueChange = (value) => setPinAttribute(widgetKey, 'digitalValue', value);
    //
    const onPwmValueChange = (value) => setPinAttribute(widgetKey, 'pwmValue', value);
    //
    const onServoMinChange = (value) => setPinAttribute(widgetKey, 'servoMin', value);
    const onServoMaxChange = (value) => setPinAttribute(widgetKey, 'servoMax', value);
    const onServoStepChange = (value) => setPinAttribute(widgetKey, 'servoStep', value);
    const onServoValueChange = (value) => setPinAttribute(widgetKey, 'servoValue', value);

    // set up initial values
    useEffect(() => {
        if (!mode) {
            setPinAttribute(widgetKey, 'mode', writeModes[0]);
        }
    // eslint-disable-next-line
    }, []);

    return <div>
        <div className='app-row'>
            <Input value={pin} onEnter={onPinChange} label="Pin (GPIO)" />
            <Select onSelected={onModeChange} label="Pin Mode" value={mode}>
                {writeModes.map((mode) => <Option>{mode}</Option>)}
            </Select>
        </div>

        {mode === writeModes[0] && <div>
            <TextNormal>Digital Config</TextNormal>
            <div className='app-row'>
                <Input min="0" max="1" step="1" type="number"
                    value={digitalValue} onEnter={onDigitalValueChange} label="Value"
                />
            </div>
        </div>}
        {mode === writeModes[1] && <div>
            <TextNormal>PWM Config</TextNormal>
            <div className='app-row'>
                <Input min="1" max="256" step="1" type="number"
                    value={pwmValue} onEnter={onPwmValueChange} label="Value"
                />
            </div>
        </div>}
        {mode === writeModes[2] && <div>
            <TextNormal>Servo Config</TextNormal>
            <div className='app-row'>
                <Input min="0" step="1" type="number"
                    value={servoMin} onEnter={onServoMinChange} label="Min"
                />
                <Input min="1" step="1" type="number"
                    value={servoMax} onEnter={onServoMaxChange} label="Max"
                />
                <Input min="1" step="1" type="number"
                    value={servoStep} onEnter={onServoStepChange} label="Step"
                />
                <Input min={servoMin} max={servoMax} step={servoStep} type="number"
                    value={servoValue} onEnter={onServoValueChange} label="Value"
                />
            </div>
        </div>}
    </div>
}

export default WidgetGPIOConfig;