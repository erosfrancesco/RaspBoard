import './index.css'
import { useGpioStore, statuses } from 'store/gpio.store';

import HeaderSection from './sectionHeader';
import AttributesSection from './sectionProperties';
import SendDataSection from './sectionWrite';
import ReadSection from './sectionRead';

function GPIO({ pin }) {
  const { pinout } = useGpioStore();
  const { status } = pinout[pin] || {};
  const isReady = status === statuses.CONNECTED

  return (
    <div className='gpio-wrapper'>
      <HeaderSection pin={pin} disabled={!isReady} />
      <ReadSection pin={pin} disabled={!isReady} />
      <SendDataSection pin={pin} disabled={!isReady} />
      <AttributesSection pin={pin} disabled={!isReady} />
    </div>
  );
}

export default GPIO;
