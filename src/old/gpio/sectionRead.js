import { useEffect, useState } from 'react';
import './sectionRead.css'
import { useGpioStore } from 'store/gpio.store';

import { TextNormal } from 'components/typography';
import Button from 'components/input/button';
import SectionWrapper from './section';
import { Input } from 'components/input/input';
import Select, { Option } from 'components/input/select';
import { events, socket } from 'store/socket.store';

const availableDateFormats = {
    date: "date",
    hours: "hours"
}

function ReadSection({ pin, disabled }) {
    const [data, setData] = useState();
    const [dataInterval, setDataInterval] = useState(1);
    const [timestampFormat, setTimestampFormat] = useState(availableDateFormats.hours);
    const [timestamp, setTimestamp] = useState();
    const { requestPinRead } = useGpioStore();

    const readPinData = () => {
        requestPinRead(pin);
    }

    const formatTimestamp = () => {
        const date = new Date();

        if (timestampFormat === availableDateFormats.hours) {
            const formatted = date.toLocaleTimeString();
            return formatted
        }

        return date.toDateString();
    }

    useEffect(() => {
        /** 
        setData('Ok');
        setTimestamp(new Date());
        /** */

        socket.on(events.PIN_READ.SUCCESS(pin), (data) => {
            setData(data);
            setTimestamp(new Date());
        })
    }, [pin]);

    return (
        <SectionWrapper>
            <div className='gpio-section-vertical'>

                {(data !== undefined) && <TextNormal>Last data received: {data}</TextNormal>}
                <div className='gpio-section-horizontal'>
                    {timestamp && <TextNormal>Received on: {formatTimestamp(timestamp)}</TextNormal>}
                    <Select label="Format data" onSelected={setTimestampFormat} value={timestampFormat} disabled={disabled}>
                        {Object.keys(availableDateFormats).map(key => <Option value={availableDateFormats[key]} key={key}>{availableDateFormats[key]}</Option>)}
                    </Select>
                </div>

                <div className='gpio-section-horizontal'>
                    <Button
                        className="gpio-action-success"
                        onClick={readPinData}
                        disabled={disabled}>
                        Request data
                    </Button>

                    <Button
                        className="gpio-action-success"
                        onClick={readPinData}
                        disabled={disabled}>
                        Request every (s)
                    </Button>
                    <Input
                        onValueChange={setDataInterval}
                        value={dataInterval}
                        label="Request data every (s)"
                        type="number" min="1"
                        disabled={disabled}
                    />
                </div>

            </div>
        </SectionWrapper>
    );
}

export default ReadSection;
