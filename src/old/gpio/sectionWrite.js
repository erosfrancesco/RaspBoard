import { useState } from 'react';
import './sectionWrite.css'
import { useGpioStore, writeModes } from 'store/gpio.store';
import Select, { Option } from 'components/input/select';
import Input from 'components/input/input';
import SectionWrapper from './section';

function SendDataSection({ pin, disabled }) {
    const [mode, setMode] = useState(writeModes.DIGITAL)
    const { writeToPin, writePWMToPin } = useGpioStore();


    const sendValue = (value) => {
        writeToPin(pin, value);
    };

    const sendPWM = (value) => {
        writePWMToPin(pin, value);
    }


    return (
        <SectionWrapper title="Send data">
            <div className='gpio-section-horizontal gpio-send-data-wrapper'>
                <Select onSelected={setMode} disabled={disabled}>
                    {Object.keys(writeModes).map((key) => <Option value={writeModes[key]} key={key}>{writeModes[key]}</Option>)}
                </Select>

                {mode === writeModes.DIGITAL && <Input
                    label="Value"
                    onEnter={sendValue}
                    disabled={disabled}
                    type="number"
                    min="0"
                    max="1"
                    step="1"
                />}

                {mode === writeModes.PWM && <Input
                    label="Value"
                    onEnter={sendPWM}
                    disabled={disabled}
                    type="number"
                    min="0"
                    max="256"
                    step="1"
                />}
            </div>
        </SectionWrapper>
    );
}

export default SendDataSection;
