
import HexadecimalInput from 'components/input/hexadecimal';
import Input from 'components/input/input';
import { TextNormal } from 'components/typography';
import './index.css';
import { useEffect, useState } from 'react';

import { useI2CStore } from './i2c.store';
import { DeleteButton } from 'components/input/button';


function I2CAddressMapItem({ name, address, removable }) {
    const { setDataMap, dataMap, setDataParameters, dataParameters, removeDataParameters } = useI2CStore();
    const dataParameter = dataParameters[name] || {};

    const [nameValue, setNameValue] = useState('');
    const [addressValue, setAddressValue] = useState('');

    const [scaleValue, setScaleValue] = useState('');
    const [offsetValue, setOffsetValue] = useState('');
    const [precisionValue, setPrecisionValue] = useState('');


    /** */
    useEffect(() => {
        setNameValue(name);
    }, [name]);

    useEffect(() => {
        setAddressValue(address)
    }, [address]);

    useEffect(() => {
        setScaleValue(dataParameter.scale)
    }, [dataParameter.scale]);

    useEffect(() => {
        setOffsetValue(dataParameter.offset)
    }, [dataParameter.offset]);

    useEffect(() => {
        setPrecisionValue(dataParameter.precision)
    }, [dataParameter.precision]);
    /** */


    /** */
    const updateScale = (value) => {
        setDataParameters(name, { scale: value });
    }

    const updateOffset = (value) => {
        setDataParameters(name, { offset: value });
    }

    const updatePrecision = (value) => {
        setDataParameters(name, { precision: value });
    }

    const updateAddressMapItem = () => {
        if (!(addressValue && nameValue)) {
            return;
        }

        const updates = dataMap;
        delete updates[name];
        updates[nameValue] = address;

        setDataMap(updates);
    }
    /** */

    const removeData = () => {
        const updates = dataMap;
        delete updates[name];

        setDataMap(updates);
        removeDataParameters(name);
    }


    return <div className='app-widget-i2c-datamap-row'>
        <Input
            className="app-input-flat"
            label='Name'
            value={nameValue}
            onValueChange={setNameValue}
            onEnter={updateAddressMapItem}
        />
        <HexadecimalInput
            className="app-input-flat"
            label='Address'
            value={addressValue}
            onValueChange={setAddressValue}
            onEnter={updateAddressMapItem}
        />
        <Input
            className="app-input-flat"
            label='Scale Factor'
            type="number"
            onEnter={updateScale}
            onValueChange={setScaleValue}
            value={scaleValue}
        />
        <Input
            className="app-input-flat"
            label='Offset'
            type="number"
            onEnter={updateOffset}
            onValueChange={setOffsetValue}
            value={offsetValue}
        />
        <Input
            className="app-input-flat"
            label='Precision'
            type="number"
            step="1"
            min="0"
            onEnter={updatePrecision}
            onValueChange={setPrecisionValue}
            value={precisionValue}
        />
        {removable && <DeleteButton className="app-widget-board-pin-delete" onClick={removeData} />}
    </div>
}

function I2CDataMapSection() {
    const { dataMap } = useI2CStore();

    return (
        <div>
            <TextNormal>Address Data map</TextNormal>

            <div className='app-widget-i2c-datamap'>
                {Object.keys(dataMap).sort().map((name) => {
                    const address = dataMap[name];

                    return <I2CAddressMapItem key={name} name={name} address={address} removable />
                })}
            </div>

            <TextNormal>Add new</TextNormal>
            <I2CAddressMapItem name="" address="" />
        </div >
    );
}

export function WidgetI2CConfig() {
    const { setDeviceAddress, setReadInterval, address, readEvery } = useI2CStore();
    const pinClassNames = "app-widget-board-config-section";

    return <div className='app-widget-board-content'>
        <div className={pinClassNames}>
            <div className='app-widget-board-config-i2c'>
                <HexadecimalInput
                    className="app-input-flat app-widget-board-hexadecimal-input"
                    label='Address'
                    onEnter={setDeviceAddress}
                    value={address}
                />
                <Input
                    className="app-input-flat"
                    label='Read every (ms)'
                    min='0' step='1'
                    type='number'
                    onEnter={setReadInterval}
                    value={readEvery}
                    initialValue={readEvery}
                />
            </div>
            <I2CDataMapSection />
        </div>
    </div>
}

export default WidgetI2CConfig;
