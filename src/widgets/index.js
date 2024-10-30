import WidgetShell from "./shell";
import WidgetGPIO from "./gpio";
import WidgetI2C from "./i2c";
import WidgetSocket from "./socket";

export const widgetMap = {
    "Shell": WidgetShell,
    "Gpio": WidgetGPIO,
    "I2C": WidgetI2C,
    "Socket": WidgetSocket
};
export const widgetDefault = WidgetShell;