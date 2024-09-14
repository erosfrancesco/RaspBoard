import './index.css';
import { statuses, useGpioStore } from './gpio.store';
import DashboardWidget from 'components/widget';
import { useEffect } from 'react';
import WidgetGPIOConfig from './config';
import WidgetGPIOStatus from './status';


export function WidgetGPIOPWM({ widgetKey, ...others }) {
    const { pinout, setPinConfig } = useGpioStore();
    const { status } = pinout[widgetKey] || {};

    const initializeWidget = (config) => {
        config.status = config.status || statuses.WAITING;
        setPinConfig(widgetKey, config);
    }

    useEffect(() => {
        const config = JSON.parse(localStorage.getItem(widgetKey));
        initializeWidget(config || {});
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
            loadConfig={(config) => {
                initializeWidget(config || {});
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
                <WidgetGPIOStatus status={status} />
                {/*}
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