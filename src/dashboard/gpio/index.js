import './index.css';
import { statuses, useGpioStore } from './gpio.store';
import DashboardWidget from 'components/widget';
import Input from 'components/input/input';
import { useEffect, useState } from 'react';
import { TextNormal } from 'components/typography';
import WidgetGPIOConfig from './config';


/** 
function WidgetGPIOConfig({ pin }) {
    const { pinout } = useGpioStore();
    const gpioConfig = pinout[pin] || {};

    const setPinName = (pinName) => {}

    return <div>
        <span>hello config</span>
        <Input value={pin} onEnter={setPinName} />
    </div>
}

/** */
export function WidgetGPIOPWM({ widgetKey, ...others }) {
    const { pinout, setPinConfig } = useGpioStore();

    const initializeWidget = (config) => {
        setPinConfig(widgetKey, config);
    }

    useEffect(() => {
        const config = JSON.parse(localStorage.getItem(widgetKey));
        initializeWidget(config);
    }, []);

    /*
    const [pwmInput, setPWMInput] = useState();
    const { pinout, connections, setupPin, configPin, writePWMToPin } = useGpioStore();

    const isReady = connections[pin] === statuses.CONNECTED;

    const sendValue = () => {
        writePWMToPin(pin, pwmInput, console.log);
    }
    /** */


    return (
        <DashboardWidget widgetName={'GPIO - ' + widgetKey}
            saveConfig={() => {
                return pinout[widgetKey] || {};
            }}
            loadConfig={(config = {}) => {
                initializeWidget(config);
                /*
                configPin(pin, config);
                setupPin(pin,
                    (data) => {
                        console.log('GPIO', pin, ' data received:', data)
                    },
                    (pin) => {
                        console.log('Opened GPIO', pin);
                    });
                /** */
            }}
            openConfig={() => <WidgetGPIOConfig widgetKey={widgetKey} />}
            {...others}>
            <div className='app-widget-gpio-content'>
                {/*}
                <TextNormal>Status: {connections[pin]}</TextNormal>
                <Input label="Send PWM"
                    type="number" min="0" max="256" step="1"
                    value={pwmInput} onValueChange={setPWMInput} onEnter={sendValue}
                    disabled={!isReady}
                />
                {/** */}
            </div>
        </DashboardWidget>
    );
}

export default WidgetGPIOPWM;