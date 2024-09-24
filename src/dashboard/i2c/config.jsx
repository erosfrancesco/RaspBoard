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
    const { dataParameters, setDataParameters } = useI2CStore();
    const dataParameter = (dataParameters || [])[i] || {};

    const updateScale = (value) => {
        dataParameters[i].scale = value;
        setDataParameters(dataParameters);
    }
    const updateOffset = (value) => {
        dataParameters[i].offset = value;
        setDataParameters(dataParameters);
    }
    const updatePrecision = (value) => {
        dataParameters[i].precision = value;
        setDataParameters(dataParameters);
    }
    const updateAddress = (value) => {
        dataParameters[i].address = value;
        setDataParameters(dataParameters);
    }
    const updateLabel = () => {
        dataParameters[i].label = value;
        setDataParameters(dataParameters);
    }

    const removeData = () => {
        delete dataParameters[i];
        setDataParameters(dataParameters);
    }


    return <div className='app-row'>
        <Input
            label='Name'
            onEnter={updateLabel}
            value={dataParameter.label || ''}
        />

        <HexadecimalInput label='Address' onEnter={updateAddress} value={dataParameter.address} />

        <Input
            label='Scale Factor'
            type="number"
            onEnter={updateScale}
            value={dataParameter.scale || 1}
        />

        <Input
            label='Offset'
            type="number"
            onEnter={updateOffset}
            value={dataParameter.offset || 0}
        />

        <Input
            label='Precision'
            type="number"
            step="1"
            min="0"
            onEnter={updatePrecision}
            value={dataParameter.precision || 0}
        />

        {removable && <DeleteButton onClick={removeData} className="app-wiget-i2c-config-row-delete" />}
    </div>
}

function I2CStartupConfigItem({ i }) {
    const { writeConfigs, setWriteConfigs } = useI2CStore();
    const config = (writeConfigs || {})[i] || {};

    //
    const updateAddress = (value) => {
        writeConfigs[i].address = value;
        setWriteConfigs(writeConfigs);
    };

    const updateData = (value) => {
        writeConfigs[i].value = value;
        setWriteConfigs(writeConfigs);
    };

    const updateLabel = (value) => {
        writeConfigs[i].label = value;
        setWriteConfigs(writeConfigs);
    };

    const removeData = () => {
        delete writeConfigs[i];
        setWriteConfigs(writeConfigs);
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
        address, readEvery, dataParameters, writeConfigs,
        setDataParameters, setDeviceAddress, setReadInterval, setWriteConfigs
    } = useI2CStore();

    const addNewDataParameter = (label) => setDataParameters([...dataParameters, { label }]);

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
                onEnter={setReadInterval}
                value={readEvery}
                initialValue={readEvery}
            />
        </div>
        <div>
            <TextNormal>Address Data map</TextNormal>

            <div className='app-column app-widget-i2c-config-list'>
                {Object.keys(dataParameters || []).map((_, i) =>
                    <I2CAddressMapItem key={i} i={i} removable />
                )}
            </div>

            <Input label="Add new" onEnter={addNewDataParameter} />
        </div>
        <div>
            <TextNormal>Write on startup</TextNormal>

            <div className='app-column app-widget-i2c-config-list'>
                {writeConfigs.map((_, i) => <I2CStartupConfigItem key={i} i={i} />)}
            </div>

            <Input label="Add new" onEnter={(label) => setWriteConfigs([...writeConfigs, { label }])} />
        </div>
    </div>
}

export default WidgetI2CConfig;
