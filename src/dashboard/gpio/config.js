import './index.css';
import Input from 'components/input/input';
import { useGpioStore, writeModes } from './gpio.store';
import Select, { Option } from 'components/input/select';

/**
 * pin
 * digital / pwm / servo
 */
export function WidgetGPIOConfig({ widgetKey }) {
    const { pinout, setPinAttribute } = useGpioStore();
    const config = pinout[widgetKey] || {};
    const { pin = "", mode = writeModes[0] } = config;

    const onPinChange = (value) => setPinAttribute(widgetKey, 'pin', value);
    const onModeChange = (value) => setPinAttribute(widgetKey, 'mode', value);

    return <div>
        <div className='app-row'>
            <Input value={pin} onEnter={onPinChange} label="Pin (GPIO)" />
            <Select onSelected={onModeChange} label="Pin Mode" value={mode}>
                {writeModes.map((mode) => <Option>{mode}</Option>)}
            </Select>
        </div>

        {mode === writeModes[0] && <div>Digital</div>}
        {mode === writeModes[1] && <div>PWM</div>}
        {mode === writeModes[2] && <div>Servo</div>}
    </div>
}

export default WidgetGPIOConfig;