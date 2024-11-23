import WidgetGPIO from "../gpio";
import WidgetShell from "../shell";

export const widgetDefault = "Shell";

export const widgetMap = {
    "Shell": <WidgetShell />,
    "GPIO": <WidgetGPIO />
};

export const configMap = {
    "Shell": [{
        "label": "Folder",
        "type": "text",
        "defaultValue": "/folder"
    }]
};
