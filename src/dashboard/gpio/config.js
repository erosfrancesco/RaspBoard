import { useState } from 'react';
import './index.css';
import Input from 'components/input/input';

export function WidgetGPIOConfig({ config = {} }) {
    const [pin, setPin] = useState(config.pin);
    // const { pin } = config;
    // const gpioConfig = pinout[pin] || {};

    // const setPinName = (pinName) => { }

    return <div>
        <span>hello config</span>
        <Input value={pin} onEnter={setPin} />
    </div>
}

export default WidgetGPIOConfig;