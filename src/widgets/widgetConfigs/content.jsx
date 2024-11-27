import { configMap } from "./index";
import { useWidgetStore } from "store/widgets";
import { useEffect, useState } from "react";

export default function DashboardWidgetConfigs({ widget } = {}) {
    const { label, widgetKey, index } = widget;
    const { widgets, setWidgets } = useWidgetStore();
    const configs = configMap[widgetKey] || [];
    const [values, setValues] = useState({});

    useEffect(() => {
        // default values
        const { label: placeholder, left, top, widget: a, ...initialConfigs } = widgets.find((item) => item.label === label && item.widget === widgetKey) || {};
        configs.map(({ defaultValue, label }) => { initialConfigs[label] = initialConfigs[label] || defaultValue; });

        setValues(initialConfigs);
        saveValues();
    }, []);

    const saveValues = () => {
        const updated = { ...widgets[index], ...values };
        widgets[index] = updated;
        setWidgets(widgets);
    }


    return <div className="column">
        {configs.map((config, i) => {
            const { label: placeholder, defaultValue, ...inputProps } = config;

            const onChange = (e) => {
                values[placeholder] = e.target.value;
                setValues(values);
            }

            const checkEnterPressed = (e) => {
                if (e.key === 'Enter') {
                    saveValues();
                }
            }

            return <input key={i}
                className="form-control"
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={checkEnterPressed}
                defaultValue={values[placeholder] || ""}
                {...inputProps}
            />
        })}
    </div>
}