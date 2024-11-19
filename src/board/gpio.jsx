import { useBoardStore } from "store/board";

export default function BoardPanelGPIOSection() {
    const { gpios, setGpios } = useBoardStore();

    const actionAdd = () => () => {
        setGpios([...gpios, {}]);
    }
    const actionDelete = (i) => () => {
        setGpios(gpios.filter((_, index) => index !== i));
    }
    const updateItem = (i, key) => (e) => {
        const { value } = e.target;
        gpios[i][key] = value;
    }

    return <table className="table">
        <thead>
            <tr>
                <th scope="col">Label</th>
                <th scope="col">Address</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {gpios.map((item, i) => <tr key={i}>
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
