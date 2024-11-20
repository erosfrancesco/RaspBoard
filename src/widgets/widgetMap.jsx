/*
import WidgetBoard from "./board";
import WidgetShell from "./shell";
import WidgetGPIOPWM from "./gpio";
/**/


const WidgetTest = () => <p>test</p>

export const widgetMap = {
    "Test": WidgetTest,
    "Test2": WidgetTest
    /*
    "Shell": WidgetShell,
    "Board": WidgetBoard,
    "Gpio": WidgetGPIOPWM
    /** */
};
export const widgetDefault = WidgetTest;