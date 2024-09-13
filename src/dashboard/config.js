import { useState } from 'react';
import './config.css';
import Input from 'components/input/input';
import Button, { DeleteButton } from 'components/input/button';
import { useDashboardStore, widgetMap } from './dashboard.store';
import { TextNormal, SectionTitle } from 'components/typography';
import Select, { Option } from 'components/input/select';

export function DashboardConfig() {
    const { widgets, addWidgetConfig, removeWidget, saveWidgets } = useDashboardStore();

    const [newWidgetName, setNewWidgetName] = useState();
    const [newWidgetType, setNewWidgetType] = useState(Object.keys(widgetMap)[0]);

    const onAdd = () => {
        addWidgetConfig(newWidgetName, newWidgetType);
    }

    return <div className='app-column app-dashboard-config'>
        <SectionTitle>Dashboard Widgets</SectionTitle>

        <div className='app-column'>
            {Object.keys(widgets).map((name) => {
                const { type, x, y } = widgets[name] || {};
                return <div key={name} className='app-row app-dashboard-config-item'>
                    <TextNormal>{type} - {name}</TextNormal>
                    <DeleteButton size="1.2" onClick={() => removeWidget(name)} />
                </div>
            })}
        </div>

        <div>
            <SectionTitle>Add Widget</SectionTitle>

            <div className='app-row' style={{ alignItems: 'flex-end' }}>
                <Input label="New Widget Name" value={newWidgetName} onChange={setNewWidgetName} />
                <Select label="New Widget Type" value={newWidgetType} onChange={(e) => {
                    setNewWidgetType(e.target.value)
                }}>
                    {Object.keys(widgetMap).map((type) =>
                        <Option>{type}</Option>
                    )}
                </Select>
                <Button disabled={!newWidgetName || !newWidgetType} onClick={onAdd}>+</Button>
            </div>

        </div>
        <Button onClick={saveWidgets}>Save Configuration</Button>
    </div>
}

export default DashboardConfig;