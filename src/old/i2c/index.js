import './index.css';

import Container from 'components/container';
import HexadecimalInput from 'components/input/hexadecimal';
import Input from 'components/input/input';
import { useI2CStore } from 'store/i2c.store';
import I2CData from './data';
import I2CDataMapSection from './addressMap';

function I2CSection({ className }) {
    const { setDeviceAddress, setReadInterval, address, readEvery } = useI2CStore();

    return (
        <Container className={className} title='i2c'>
            <div className='app-i2c-wrapper'>

                <I2CDataMapSection />

                <div className='app-i2c-flexible'>
                    <HexadecimalInput label='Address' onEnter={setDeviceAddress} value={address} />
                    <Input label='Read every (ms)'
                        min='0' step='1'
                        type='number'
                        onEnter={setReadInterval}
                        value={readEvery}
                    />
                </div>

                <I2CData />
            </div>
        </Container>
    );
}

export default I2CSection;


