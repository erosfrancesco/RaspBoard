import Input from 'components/input/input';
import { TextNormal } from 'components/typography';
import './index.css';

import { useI2CStore } from './i2c.store';
import { DeleteButton } from 'components/input/button';


function HexadecimalInput({ className, ...props }) {
    const classNames = 'app-input-hexadecimal' + (className ? ' ' + className : '');

    return <Input
        className={classNames}
        maxLength="2"
        prefix="0x"
        {...props}
    />
}


function I2CAddressMapItem({ i, removable }) {
    const { dataStructure, setDataStructure } = useI2CStore();
    const datum = (dataStructure || [])[i] || {};

    const updateScale = (value) => {
        dataStructure[i].scale = value;
        setDataStructure(dataStructure);
    }
    const updateOffset = (value) => {
        dataStructure[i].offset = value;
        setDataStructure(dataStructure);
    }
    const updatePrecision = (value) => {
        dataStructure[i].precision = value;
        setDataStructure(dataStructure);
    }
    const updateAddress = (value) => {
        dataStructure[i].address = value;
        setDataStructure(dataStructure);
    }
    const updateLabel = () => {
        dataStructure[i].label = value;
        setDataStructure(dataStructure);
    }

    const removeData = () => {
        delete dataStructure[i];
        setDataStructure(dataStructure);
    }


    return <div className='app-row'>
        <Input
            label='Name'
            onEnter={updateLabel}
            value={datum.label || ''}
        />

        <HexadecimalInput label='Address' onEnter={updateAddress} value={datum.address} />

        <Input
            label='Scale Factor'
            type="number"
            onEnter={updateScale}
            value={datum.scale || 1}
        />

        <Input
            label='Offset'
            type="number"
            onEnter={updateOffset}
            value={datum.offset || 0}
        />

        <Input
            label='Precision'
            type="number"
            step="1"
            min="0"
            onEnter={updatePrecision}
            value={datum.precision || 0}
        />

        {removable && <DeleteButton onClick={removeData} className="app-wiget-i2c-config-row-delete" />}
    </div>
}

function I2CStartupConfigItem({ i }) {
    const { deviceSetup, setDeviceSetup } = useI2CStore();
    const config = (deviceSetup || {})[i] || {};

    //
    const updateAddress = (value) => {
        deviceSetup[i].address = value;
        setDeviceSetup(deviceSetup);
    };

    const updateData = (value) => {
        deviceSetup[i].value = value;
        setDeviceSetup(deviceSetup);
    };

    const updateLabel = (value) => {
        deviceSetup[i].label = value;
        setDeviceSetup(deviceSetup);
    };

    const removeData = () => {
        delete deviceSetup[i];
        setDeviceSetup(deviceSetup);
    };
    //

    return <div className='app-row'>
        <Input label="Label" onEnter={updateLabel} value={config.label} />
        <HexadecimalInput label='Address' onEnter={updateAddress} value={config.address} />
        <Input label='Value' onEnter={updateData} value={config.value} />

        <DeleteButton onClick={removeData} className="app-wiget-i2c-config-row-delete" />
    </div>
}

export function WidgetI2CConfig() {
    const {
        address, readFrequency, dataStructure, deviceSetup,
        setDataStructure, setDeviceAddress, setReadFrequency, setDeviceSetup
    } = useI2CStore();

    const addNewDatum = (label) => setDataStructure([...(dataStructure || []), { label }]);

    return <div className='app-column app-widget-i2c-config'>
        <div className='app-row'>
            <HexadecimalInput
                label='Address'
                onEnter={setDeviceAddress}
                value={address}
            />
            <Input
                label='Read every (ms)'
                min='0' step='1'
                type='number'
                onEnter={setReadFrequency}
                value={readFrequency}
                initialValue={readFrequency}
            />
        </div>
        <div>
            <TextNormal>Address Data map</TextNormal>

            <div className='app-column app-widget-i2c-config-list'>
                {Object.keys(dataStructure || []).map((_, i) =>
                    <I2CAddressMapItem key={i} i={i} removable />
                )}
            </div>

            <Input label="Add new" onEnter={addNewDatum} />
        </div>
        <div>
            <TextNormal>Write on startup</TextNormal>

            <div className='app-column app-widget-i2c-config-list'>
                {deviceSetup.map((_, i) => <I2CStartupConfigItem key={i} i={i} />)}
            </div>

            <Input label="Add new" onEnter={(label) => setDeviceSetup([...deviceSetup, { label }])} />
        </div>
    </div>
}

export default WidgetI2CConfig;
