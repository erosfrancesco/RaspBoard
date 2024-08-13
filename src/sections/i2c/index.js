/**
 * Addr
 * MemoryMap
 * AcquisitionInterval
 */
import './index.css';

import { useGpioStore } from 'store/gpio.store';
import Container from 'components/container';
import HexadecimalInput from 'components/hexadecimal';
import List from 'components/list';
import Input from 'components/input';
import { TextNormal } from 'components/typography';

function I2CSection({ className }) {
    const { pinout, subscribeToPin } = useGpioStore();
    const setAddressMapList = console.log

    return (
        <Container className={className} title="i2c">
            <div className='app-i2c-wrapper'>
                <HexadecimalInput label="I2C Address" />

                <TextNormal>Address map</TextNormal>
                <List
                    onItemsUpdate={setAddressMapList}
                    Item={({ item = {}, updateItem, addItem }) => {
                        return <div style={{ display: 'flex' }}>
                            <Input label="Name"
                                value={item.name}
                                onValueChange={(name) => updateItem({ name })}
                                onEnter={() => {
                                    if (item.address && item.name) {
                                        addItem(item);
                                    }
                                }} />
                            <HexadecimalInput label="Address"
                                value={item.address}
                                onValueChange={(address) => updateItem({ address })}
                                onEnter={() => {
                                    if (item.address && item.name) {
                                        addItem(item);
                                    }
                                }} />
                        </div>
                    }} />
            </div>
        </Container>
    );
}

export default I2CSection;


