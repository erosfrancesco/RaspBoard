
import socket from '@/socket.store';

export const events = {
    OPEN: 'i2c.open',
    DATA: 'i2c.data',
    CLOSE: 'i2c.close',
    STATUS: 'i2c.status',
    // TODO: - WRITE
};

export default socket;