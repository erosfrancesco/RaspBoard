import './addressMap.css';

import HexadecimalInput from 'components/input/hexadecimal';
import Input from 'components/input/input';
import Button from 'components/input/button';
import { TextNormal } from 'components/typography';
import { useI2CStore } from 'store/i2c.store';
import { useEffect, useState } from 'react';

export function I2CAddressMapItem({ name, address, removable }) {
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


    return <div className='app-i2c-flexible app-i2c-parameters-row'>
        <Input label='Name'
            value={nameValue}
            onValueChange={setNameValue}
            onEnter={updateAddressMapItem}
        />
        <HexadecimalInput label='Address'
            value={addressValue}
            onValueChange={setAddressValue}
            onEnter={updateAddressMapItem}
        />
        <Input label='Scale Factor'
            type="number"
            onEnter={updateScale}
            onValueChange={setScaleValue}
            value={scaleValue}
        />
        <Input label='Offset'
            type="number"
            onEnter={updateOffset}
            onValueChange={setOffsetValue}
            value={offsetValue}
        />
        <Input label='Precision'
            type="number"
            step="1"
            min="0"
            onEnter={updatePrecision}
            onValueChange={setPrecisionValue}
            value={precisionValue}
        />
        {removable && <Button className="app-i2c-parameter-remove app-color-danger" onClick={removeData}>X</Button>}
    </div>
}

export function I2CDataMapSection({ className }) {
    const { dataMap } = useI2CStore();

    return (
        <div className={className}>
            <TextNormal>Address map</TextNormal>
            {Object.keys(dataMap).sort().map((name) => {
                const address = dataMap[name];

                return <I2CAddressMapItem key={name} name={name} address={address} removable />
            })}

            <TextNormal>Add new</TextNormal>
            <I2CAddressMapItem name="" address="" />
        </div >
    );
}

export default I2CDataMapSection;


