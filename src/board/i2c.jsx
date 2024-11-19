import { useBoardStore } from "store/board";
import I2CSectionSchema from "./i2c.schema";
import I2CSectionSetup from "./i2c.setup";

export default function BoardPanelI2CSection() {
    const { i2c, setI2C } = useBoardStore();
    const { address, readFrequency } = i2c;

    const onAddressChange = (e) => {
        const newValue = e.target.value;
        i2c.address = newValue;
        setI2C(i2c);
    }

    const onFrequencyChange = (e) => {
        const newValue = e.target.value;
        i2c.readFrequency = newValue;
        setI2C(i2c);
    }

    return <div className="column" style={{
        marginTop: '0.5em'
    }}>
        <strong>Configs</strong>
        <div className="form-inline">
            <input className="form-control"
                type="number"
                placeholder="Address"
                defaultValue={address}
                onKeyDown={onAddressChange}
            />
            <input className="form-control"
                type="number"
                placeholder="Frequency"
                defaultValue={readFrequency}
                onKeyDown={onFrequencyChange}
            />
        </div>
        <div>
            <strong>Data Schema</strong>
            <I2CSectionSchema />
        </div>
        <div>
            <strong>Device Setup</strong>
            <I2CSectionSetup />
        </div>
    </div>
}
/** */
