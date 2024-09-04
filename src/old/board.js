
import { useEffect, useState } from 'react';
import './board.css';

import Input from 'components/input/input';
import Button from 'components/input/button';
import { useGpioStore } from 'store/gpio.store';
import Gpio from './gpio';
import Container from 'components/container';
import I2CSection from './i2c';

function Board({ className = "" }) {
    const [isBusy, setIsBusy] = useState(false);
    const [pin, setPin] = useState('');

    const { pinout, subscribeToPin } = useGpioStore();

    const resetState = () => {
        setIsBusy(false);
        setPin('');
    }

    const createNewConnection = (name) => {
        setIsBusy(true);

        subscribeToPin(name, {
            onOpen: () => {
                console.log('Connected to [' + name + ']');
                resetState();
            },
            onRead: (msg) => {
                console.log('Got message from pin: ', msg);
            }
        });
    };


    useEffect(() => {
        return () => {
            resetState();
        }
    }, []);


    return (
        <div className={className + " board-connections"}>
            <div className='flexible'>
                <Input
                    label="Connect to: "
                    name="pin"
                    value={pin}
                    onValueChange={setPin}
                    onEnter={createNewConnection}
                    disabled={isBusy}
                />
                <Button onClick={() => createNewConnection(pin)} disabled={isBusy || !pin}>+</Button>
            </div>

            <Container>
                {Object.keys(pinout).map((pin, i) => <Gpio pin={pin} key={pin + '-' + i} />)}
            </Container>

            <I2CSection />
        </div>
    );
}

export default Board;
