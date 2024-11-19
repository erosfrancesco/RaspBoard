import Panel from "components/panel";
import Tabs from "components/tabs";

import BoardPanelGPIOSection from "./gpio";
import BoardPanelI2CSection from "./i2c";
import BoardPanelOptionSection from "./options";


export default function BoardPanel() {
    return <Panel
        title="Board"
        className="card"
        style={{
            position: 'absolute',
            bottom: 0,
            left: '1em',
            width: '40vw',
            borderBottom: 'none',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }}>
        <div style={{
            overflowY: 'scroll',
            height: '40vh',
            paddingRight: '0.5em'
        }}>
            <Tabs
                titles={['GPIO', 'I2C', 'Options']}
                pages={[
                    <BoardPanelGPIOSection />,
                    <BoardPanelI2CSection />,
                    <BoardPanelOptionSection />
                ]}
            />
        </div>
    </Panel>
}

