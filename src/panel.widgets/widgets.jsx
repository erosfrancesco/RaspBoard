import { useWidgetStore } from "store/widgets";

import { widgetMap } from '../widgets/widgetMap'

export default function WidgetPanelWidgetSection() {
    const { widgets, setWidgets } = useWidgetStore();
    console.log(widgets)

    const actionAdd = () => () => {
        setWidgets([...widgets, {
            label: '',
            widget: Object.keys(widgetMap)[0],
            top: 0, left: 0
        }]);
    }
    const actionDelete = (i) => () => {
        setWidgets(widgets.filter((_, index) => index !== i));
    }
    const updateItem = (i, key) => (e) => {
        const { value } = e.target;
        widgets[i][key] = value;
    }

    return <table className="table">
        <thead>
            <tr>
                <th scope="col">Label</th>
                <th scope="col">Widget</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {widgets.map((item, i) => <tr key={i}>
                <td>
                    <input className="form-control"
                        type="text"
                        placeholder="Label"
                        defaultValue={item.label}
                        onChange={updateItem(i, 'label')}
                    />
                </td>
                <td>
                    <select className="form-control"
                        defaultValue={item.widget}
                        onChange={updateItem(i, 'widget')}>
                        {Object.keys(widgetMap).map((key) => <option value={key} key={key}>{key}</option>)}
                    </select>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={actionDelete(i)}>X</button>
                </td>
            </tr>
            )}
        </tbody>
        <caption>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={actionAdd()}>+</button>
        </caption>
    </table>
}
