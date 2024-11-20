import Accordion from "components/accordion";
import { useBoardStore } from "store/board";


const PanelConfigTitle = ({ title, onLoad, onSave }) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }}>
        <span>{title}</span>
        <div style={{
            gap: '0.5em',
            display: 'flex',
        }}>
            <button type="button" className="btn btn-secondary" onClick={(e) => {
                e.stopPropagation();
                onLoad();
            }}>Load</button>
            <button type="button" className="btn btn-primary" onClick={(e) => {
                e.stopPropagation();
                onSave();
            }}>Save</button>
        </div>
    </div>
}

export default function WidgetPanelOptionSection() {
    const {
        setGpios,
        gpiosString, setGpiosString, parse,
        save, load
    } = useBoardStore();

    //
    const onGpiosConfigSave = () => {
        const config = parse(gpiosString);
        setGpios(config);
    }


    return <div className="col">
        <h6>Current loaded config:</h6>

        <div>
            <button type="button" className="btn btn-secondary" onClick={(e) => {
                e.stopPropagation();
                load();
            }}>Load from local</button>
            <button type="button" className="btn btn-primary" onClick={(e) => {
                e.stopPropagation();
                save();
            }}>Save to local</button>
        </div>

        <Accordion title={<PanelConfigTitle title="Widgets" onLoad={() => { }} onSave={onGpiosConfigSave} />}>
            <textarea type="textarea" className="form-control"
                style={{
                    width: '100%',
                    minHeight: '10em'
                }}
                onChange={(e) => setGpiosString(e.target.value)}
                defaultValue={gpiosString}
            />
        </Accordion>
    </div>
}