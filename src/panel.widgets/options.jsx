import Accordion from "components/accordion";
import { useWidgetStore } from "store/widgets";


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
        setWidgets,
        widgetsString, setWidgetsString,
        parse, save, load
    } = useWidgetStore();

    //
    const onWidgetsConfigSave = () => {
        const config = parse(widgetsString);
        setWidgets(config);
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

        <Accordion title={<PanelConfigTitle title="Widgets" onLoad={() => { }} onSave={onWidgetsConfigSave} />}>
            <textarea type="textarea" className="form-control"
                style={{
                    width: '100%',
                    minHeight: '10em'
                }}
                onChange={(e) => setWidgetsString(e.target.value)}
                defaultValue={widgetsString}
            />
        </Accordion>
    </div>
}