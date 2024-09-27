
import socket from '@/socket.store';

export const events = {
    /*
    // OLD EVENTS
    SETTINGS: {
        EVENT: () => 'i2c-settings',
        WRITE: () => 'i2c-settings-write',
        SUCCESS: () => 'i2c-success-settings'
    },

    OPEN: {
        EVENT: () => 'i2c-open',
        SUCCESS: () => 'i2c-success-open'
    },

    CLOSE: {
        EVENT: () => 'i2c-close',
        SUCCESS: () => 'i2c-success-close'
    },
    DATA: () => 'i2c-data',
    /** */

    OPEN: 'i2c-open',
    DATA: 'i2c-data',
    CLOSE: 'i2c-close',
    STATUS: 'i2c-status',
    // TODO: - WRITE
};

export default socket;