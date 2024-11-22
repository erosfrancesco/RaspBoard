/*
import WidgetBoard from "./board";
import WidgetShell from "./shell";
import WidgetGPIOPWM from "./gpio";
/**/

import WidgetGPIO from "./gpio";
import WidgetShell from "./shell";


const WidgetTest = () => <p style={{
    width: '5em',
    height: '5em'
}}>Widget Test</p>

export const widgetMap = {
    "GPIO": <WidgetGPIO />,
    "Shell": <WidgetShell />,
    "Test": <WidgetTest />
    /*
    "Shell": WidgetShell,
    "Board": WidgetBoard,
    "Gpio": WidgetGPIOPWM
    /** */
};
export const widgetDefault = "Test";