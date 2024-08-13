import { useEffect, useState } from 'react';
import './sectionHeader.css'
import { useGpioStore, statuses } from 'store/gpio.store';
import { SectionTitle, TextNormal } from 'components/typography';
import Button from 'components/button';
import SectionWrapper from './section';

function HeaderSection({ pin, disabled }) {
  const { removePin, socket, pinout, setPinProperty, toggle } = useGpioStore();

  const [status, setStatus] = useState(statuses.WAITING);
  const [color, setColor] = useState('orange');
  const [name, setName] = useState('GPIO ' + pin);

  const closePinConnection = () => {
    setPinProperty(pin, 'status', statuses.CLOSED);
    removePin(pin);
  };
  //

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
  }, [status]);

  useEffect(() => {
    socket.on('pin-success-open-' + pin, () => {
      setPinProperty(pin, 'status', statuses.CONNECTED);
    });
  }, [pin]);

  useEffect(() => {
    const { name, status } = pinout[pin] || {};

    if (name) {
      setName(name);
    }

    if (status) {
      setStatus(status)
    }
  }, [toggle]);


  return (
    <SectionWrapper>
      <div className="gpio-section-horizontal">
        <Button className="gpio-action-warning" onClick={closePinConnection} disabled={disabled}>Remove</Button>
        <TextNormal>{name} : </TextNormal>
        <SectionTitle style={{ color }}>{status}</SectionTitle>
      </div>
    </SectionWrapper>
  );
}

export default HeaderSection;
