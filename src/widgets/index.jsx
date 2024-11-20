import Panel from "components/panel";
import WidgetPanelWidgetSection from './widgets'


export default function WidgetPanel({ ...args } = {}) {
    return <Panel
        title="Board"
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
            height: '40vh',
            paddingRight: '0.5em'
        }}>
            <WidgetPanelWidgetSection />
        </div>
    </Panel>
}

