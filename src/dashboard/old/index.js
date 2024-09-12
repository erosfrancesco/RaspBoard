import './index.css';
import { statuses, useGpioStore } from 'store/gpio.store';
import DashboardWidget from 'components/widget';
import Input from 'components/input/input';
import { useState } from 'react';
import { TextNormal } from 'components/typography';


/** */
function WidgetGPIOConfig({ pin }) {
    const { pinout } = useGpioStore();
    const gpioConfig = pinout[pin] || {};

    return <div>
        <span>hello config</span>
    </div>
}

/** */
function WidgetGPIOPWM({ pin }) {
    const [pwmInput, setPWMInput] = useState();
    const { pinout, connections, setupPin, configPin, writePWMToPin } = useGpioStore();

    const isReady = connections[pin] === statuses.CONNECTED;

    const sendValue = () => {
        writePWMToPin(pin, pwmInput, console.log);
    }


    return (
        <DashboardWidget widgetName={'GPIO - ' + pin}
            saveConfig={() => {
                return pinout[pin] || {};
            }}
            loadConfig={(config) => {
                configPin(pin, config);
                setupPin(pin,
                    (data) => {
                        console.log('GPIO', pin, ' data received:', data)
                    },
                    (pin) => {
                        console.log('Opened GPIO', pin);
                    });
            }}
            openConfig={(config) => {
                return <WidgetGPIOConfig pin={pin} />
            }}>
            <div className='app-widget-gpio-content'>
                <TextNormal>Status: {connections[pin]}</TextNormal>
                <Input label="Send PWM"
                    type="number" min="0" max="256" step="1"
                    value={pwmInput} onValueChange={setPWMInput} onEnter={sendValue}
                    disabled={!isReady}
                />
            </div>
        </DashboardWidget>
    );
}

export default WidgetGPIOPWM;