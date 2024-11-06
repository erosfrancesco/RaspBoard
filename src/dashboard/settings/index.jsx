import { useState } from 'react';
import './index.scss';

import Input from 'components/input/input';
import Button, { DeleteButton } from 'components/input/button';
import { useDashboardStore } from '../store';
import { widgetMap } from '@/widgets';
import { AppTextLabel, AppSubtitle } from 'components/typography';
import Select, { Option } from 'components/input/select';

export function DashboardConfig() {
    const { widgets, addWidget, removeWidget, saveWidgets } = useDashboardStore();

    const [newWidgetName, setNewWidgetName] = useState();
    const [newWidgetType, setNewWidgetType] = useState(Object.keys(widgetMap)[0]);

    const onAdd = () => {
        addWidget(newWidgetName, newWidgetType);
    }

    return <div className='app-column app-dashboard-config'>
        <AppSubtitle>Dashboard Widgets</AppSubtitle>

        <div className='app-column'>
            {Object.keys(widgets).map((name, i) => {
                const {
                    type
                } = widgets[name] || {};
                return <div key={i} className='app-row app-dashboard-config-item'>
                    <AppTextLabel>{type} - {name}</AppTextLabel>
                    <DeleteButton size="1.2" onClick={() => removeWidget(name)} />
                </div>
            })}
        </div>

        <div>
            <AppSubtitle>Add Widget</AppSubtitle>

            <div className='app-row' style={{ alignItems: 'flex-end' }}>
                <Input label="New Widget Name" value={newWidgetName} onChange={setNewWidgetName} />
                <Select label="New Widget Type" value={newWidgetType} onSelected={setNewWidgetType}>
                    {Object.keys(widgetMap).map((type) =>
                        <Option key={type}>{type}</Option>
                    )}
                </Select>
                <Button disabled={!newWidgetName || !newWidgetType} onClick={onAdd}>+</Button>
            </div>

        </div>
        <Button onClick={saveWidgets}>Save Configuration</Button>
    </div>
}

export default DashboardConfig;