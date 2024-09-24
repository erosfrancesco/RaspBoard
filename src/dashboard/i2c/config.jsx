import Input from 'components/input/input';
import { TextNormal } from 'components/typography';
import './index.css';
import { useEffect, useState } from 'react';

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


function I2CAddressMapItem({ name, removable }) {
    const { dataParameters, setDataParameters, removeDataParameters } = useI2CStore();
    const dataParameter = (dataParameters || {})[name] || {};

    const [nameValue, setNameValue] = useState('');

    const [addressValue, setAddressValue] = useState(dataParameter.address || '');
    const [scaleValue, setScaleValue] = useState(dataParameter.scale || '');
    const [offsetValue, setOffsetValue] = useState(dataParameter.offset || '');
    const [precisionValue, setPrecisionValue] = useState(dataParameter.precision || '');


    /** */
    useEffect(() => setNameValue(name), [name]);
    useEffect(() => setAddressValue(dataParameter.address), [dataParameter.address]);
    useEffect(() => setScaleValue(dataParameter.scale), [dataParameter.scale]);
    useEffect(() => setOffsetValue(dataParameter.offset), [dataParameter.offset]);
    useEffect(() => setPrecisionValue(dataParameter.precision), [dataParameter.precision]);
    /** */


    /** */
    const updateScale = (value) => setDataParameters(name, { scale: value });
    const updateOffset = (value) => setDataParameters(name, { offset: value });
    const updatePrecision = (value) => setDataParameters(name, { precision: value });
    const updateAddress = (value) => setDataParameters(name, { address: value });
    /** */

    const updateAddressMapItem = () => {
        setDataParameters(name, {
            address: addressValue,
            scale: scaleValue,
            offset: offsetValue,
            precision: precisionValue
        });
    }

    const removeData = () => removeDataParameters(name);


    return <div className='app-row'>
        <Input
            label='Name'
            value={nameValue}
            onValueChange={setNameValue}
            onEnter={updateAddressMapItem}
        />
        <HexadecimalInput
            label='Address'
            onEnter={updateAddress}
            onValueChange={setAddressValue}
            value={addressValue}
        />
        <Input
            label='Scale Factor'
            type="number"
            onEnter={updateScale}
            onValueChange={setScaleValue}
            value={scaleValue}
        />
        <Input
            label='Offset'
            type="number"
            onEnter={updateOffset}
            onValueChange={setOffsetValue}
            value={offsetValue}
        />
        <Input
            label='Precision'
            type="number"
            step="1"
            min="0"
            onEnter={updatePrecision}
            onValueChange={setPrecisionValue}
            value={precisionValue}
        />
        {removable && <DeleteButton onClick={removeData} className="app-wiget-i2c-config-row-delete" />}
    </div>
}

export function WidgetI2CConfig() {
    const {
        address, readEvery, dataParameters,
        setDataParameters, setDeviceAddress, setReadInterval,
    } = useI2CStore();

    return <div className='app-widget-i2c-config'>
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

            <div className='app-column app-widget-i2c-config-datamap'>
                {Object.keys(dataParameters || {}).sort().map((name) =>
                    <I2CAddressMapItem key={name} name={name} removable />
                )}
            </div>

            <Input label="Add new" onEnter={(name) => setDataParameters(name, {})} />
        </div>

    </div>
}

export default WidgetI2CConfig;
