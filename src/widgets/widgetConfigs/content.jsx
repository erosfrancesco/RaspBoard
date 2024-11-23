import { widgetDefault, configMap } from "./index";
import { useWidgetStore } from "store/widgets";
import { useEffect, useState } from "react";

export default function DashboardWidgetConfigs({ widget = widgetDefault, label = "" } = {}) {
    const { widgets } = useWidgetStore();
    const configs = configMap[widget] || [];
    const [values, setValues] = useState({});

    useEffect(() => {
        const { label: placeholder, left, top, widget: a, ...initialConfigs } = widgets.find((item) => item.label === label && item.widget === widget) || {};
        configs.map(({ defaultValue, label }) => { initialConfigs[label] = defaultValue; });

        setValues(initialConfigs);
    }, []);

    const saveValues = () => {
        console.log('saving', values, 'for', label)
    }


    return <div className="column">
        {configs.map((config, i) => {
            const { label: placeholder, defaultValue, ...inputProps } = config;
            console.log('k', values)


            const onChange = (e) => {
                values[placeholder] = e.target.value;
                setValues(values);
                console.log('values', values)
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
                value={values[placeholder] || ""}
                {...inputProps}
            />
        })}
    </div>
}