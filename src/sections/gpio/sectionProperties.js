import { useEffect, useState } from 'react';
import './sectionProperties.css'
import { useGpioStore } from 'store/gpio.store';
import { TextNormal } from 'components/typography';
import Input from 'components/input';
import Button from 'components/button';
import SectionWrapper from './section';


function AttributesSection({ pin, disabled }) {
    const { pinout, setPinProperty } = useGpioStore();
    const [attributes, setAttributes] = useState({});
    const [newAttrName, setNewAttrName] = useState('');
    const [newAttrValue, setNewAttrValue] = useState('');

    useEffect(() => {
        const { status, ...attributes } = pinout[pin] || {};
        setAttributes(attributes);
    }, [pin])


    const updateAttributeValue = (key) => (value) => {
        setPinProperty(pin, key, value);
    }

    const addAttribute = () => {
        setPinProperty(pin, newAttrName, newAttrValue);
        setNewAttrName('');
        setNewAttrValue('');

        const { status, ...attributes } = pinout[pin] || {};
        setAttributes(attributes);
    }

    return <SectionWrapper title="Attributes">
        {Object.keys(attributes).map((key) => {
            const value = attributes[key];
            return <div className='gpio-section-horizontal section-property-row' key={key}>
                <TextNormal>{key}</TextNormal>
                <Input value={value} onEnter={updateAttributeValue(key)} disabled={disabled} />
            </div>
        })}

        <div className='gpio-section-horizontal section-property-row'>
            <Input label="Name" value={newAttrName} onValueChange={setNewAttrName} disabled={disabled} />
            <Input label="Value" value={newAttrValue} onValueChange={setNewAttrValue}
                disabled={disabled && newAttrName === ''}
            />
            <Button onClick={addAttribute} disabled={disabled}>+</Button>
        </div>
    </SectionWrapper>
}

export default AttributesSection