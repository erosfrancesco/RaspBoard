import { useEffect, useState } from 'react';
import { statuses } from './gpio.store';
import { SectionTitle } from 'components/typography';

function WidgetGPIOStatus({ status }) {
    const [color, setColor] = useState('orange');

    useEffect(() => {
        if (status === statuses.CONNECTED) {
            setColor('teal');
        }

        if (status === statuses.CLOSED) {
            setColor('crimson');
        }

        if (status === statuses.WAITING) {
            setColor('orange');
        }
        // eslint-disable-next-line
    }, [status]);

    return <SectionTitle style={{ color }}>{status}</SectionTitle>
}

export default WidgetGPIOStatus;
