import ExpansionPanel from 'components/expansionPanel';
import './index.css'
import { useState } from 'react';

import Input from 'components/input/input';
import Button, { DeleteButton } from 'components/input/button';
import { useDashboardStore } from '../store';
import { widgetMap } from '@/widgets';
import { TextNormal, SectionTitle } from 'components/typography';
import Select, { Option } from 'components/input/select';


function WidgetPanel() {

    const { widgets, addWidget, removeWidget, saveWidgets } = useDashboardStore();

    const [newWidgetName, setNewWidgetName] = useState();
    const [newWidgetType, setNewWidgetType] = useState(Object.keys(widgetMap)[0]);

    const onAdd = () => {
        addWidget(newWidgetName, newWidgetType);
    }

    return (
        <ExpansionPanel title="Widgets" className="app-dashboard-widgets-panel" hide>
            <div className='app-dashboard-widgets-panel-content app-dashboard-widgets-panel-section'>
                {Object.keys(widgets).map((name, i) => {
                    const {
                        type
                    } = widgets[name] || {};

                    return <div key={i} className='app-dashboard-widgets-panel-item'>
                        <DeleteButton size="1.2" onClick={() => removeWidget(name)} />
                        <TextNormal>{type} - {name}</TextNormal>
                    </div>
                })}
            </div>

            <div className='app-dashboard-widgets-panel-footer app-dashboard-widgets-panel-section'>
                <SectionTitle>Add Widget</SectionTitle>

                <div className='app-row'>
                    <Input label="New Widget Name" value={newWidgetName} onChange={setNewWidgetName} />
                    <Select label="New Widget Type" value={newWidgetType} onSelected={setNewWidgetType}>
                        {Object.keys(widgetMap).map((type) =>
                            <Option key={type}>{type}</Option>
                        )}
                    </Select>
                    <Button disabled={!newWidgetName || !newWidgetType} onClick={onAdd}>+</Button>
                </div>

                <Button onClick={saveWidgets}>Save Configuration</Button>
            </div>
        </ExpansionPanel>
    );
}

export default WidgetPanel;
