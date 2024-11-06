import { Bottom } from 'components/box';
import './index.scss'
import { useState } from 'react';

import Button from 'components/input/button';

import { DeleteButton } from 'components/input/button';
import { useDashboardStore } from '../store';
import { widgetMap } from '@/widgets';
import { AppSubtitleCaption, AppSubtitle } from 'components/typography';
import Select, { Option } from 'components/input/select';


function WidgetPanel() {

    const { widgets, addWidget, removeWidget, saveWidgets } = useDashboardStore();

    const [newWidgetName, setNewWidgetName] = useState();
    const [newWidgetType, setNewWidgetType] = useState(Object.keys(widgetMap)[0]);

    const onAdd = () => {
        addWidget(newWidgetName, newWidgetType);
    }

    return (
        <Bottom title="Widgets" className="app-dashboard-widgets-panel" hide>
            <div className='app-dashboard-widgets-panel-content app-dashboard-widgets-panel-section'>
                {Object.keys(widgets).map((name, i) => {
                    const {
                        type
                    } = widgets[name] || {};

                    return <div key={i} className='app-dashboard-widgets-panel-item'>
                        <DeleteButton size="1.2" onClick={() => removeWidget(name)} />
                        <AppSubtitleCaption>{type} - {name}</AppSubtitleCaption>
                    </div>
                })}
            </div>

            <div className='app-dashboard-widgets-panel-footer app-dashboard-widgets-panel-section'>
                <AppSubtitle>Add Widget</AppSubtitle>

                <div className='app-row'>
                    <input label="New Widget Name" value={newWidgetName} onChange={setNewWidgetName} />
                    <Select label="New Widget Type" value={newWidgetType} onSelected={setNewWidgetType}>
                        {Object.keys(widgetMap).map((type) =>
                            <Option key={type}>{type}</Option>
                        )}
                    </Select>
                    <Button disabled={!newWidgetName || !newWidgetType} onClick={onAdd}>+</Button>
                </div>

                <Button onClick={saveWidgets}>Save Configuration</Button>
            </div>
        </Bottom>
    );
}

export default WidgetPanel;
