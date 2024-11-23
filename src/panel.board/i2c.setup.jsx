import { useBoardStore } from "store/board";

export default function I2CSectionSetup() {
    const { i2c, setI2C } = useBoardStore();
    const { deviceSetup } = i2c;

    const actionAdd = () => () => {
        i2c.deviceSetup = [...i2c.deviceSetup, {}]
        setI2C(i2c);
    }
    const actionDelete = (i) => () => {
        i2c.deviceSetup.splice(i, 1);
        setI2C(i2c);
    }
    const updateItem = (i, key) => (e) => {
        const { value } = e.target;
        i2c.deviceSetup[i][key] = value;
    }

    return <table className="table">
        <thead>
            <tr>
                <th scope="col">Label</th>
                <th scope="col">Address</th>
                <th scope="col">Value</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {deviceSetup.map((item, i) => <tr key={i}>
                <td>
                    <input className="form-control"
                        type="text"
                        placeholder="Label"
                        defaultValue={item.label}
                        onChange={updateItem(i, 'label')}
                    />
                </td>
                <td>
                    <input className="form-control"
                        type="number"
                        placeholder="Address"
                        defaultValue={item.address}
                        onChange={updateItem(i, 'address')}
                    />
                </td>
                <td>
                    <input className="form-control"
                        type="number"
                        placeholder="Value"
                        defaultValue={item.value}
                        onChange={updateItem(i, 'value')}
                    />
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={actionDelete(i)}><i className="bi bi-x-lg" /></button>
                </td>
            </tr>
            )}
        </tbody>
        <caption>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={actionAdd()}>+</button>
        </caption>
    </table>


}
