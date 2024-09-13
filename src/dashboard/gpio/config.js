import { useState } from 'react';
import './index.css';
import Input from 'components/input/input';
import { useGpioStore } from './gpio.store';

export function WidgetGPIOConfig({ widgetKey }) {
    const { pinout, setPin } = useGpioStore();
    const config = pinout[widgetKey] || {};
    const pin = config.pin || '';

    console.log(pin, pinout, widgetKey);

    return <div>
        <Input value={pin} onEnter={(pin) => setPin(widgetKey, pin)} label="Pin (GPIO)" />
    </div>
}

export default WidgetGPIOConfig;