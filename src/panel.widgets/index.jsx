import Panel from "components/panel";
import Tabs from "components/tabs";

import WidgetPanelWidgetSection from './widgets';
import WidgetPanelOptionSection from "./options";


export default function WidgetPanel({ ...args } = {}) {
    return <Panel
        title="Widgets"
        className="card"
        style={{
            position: 'absolute',
            bottom: 0,
            right: '1em',
            width: '30vw',
            borderBottom: 'none',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }}
        {...args}>
        <div style={{
            overflowY: 'scroll',
            height: '60vh',
            paddingRight: '0.5em'
        }}>
            <Tabs
                titles={['Widgets', 'Options']}
                pages={[
                    <WidgetPanelWidgetSection />,
                    <WidgetPanelOptionSection />
                ]}
            />
        </div>
    </Panel>
}

