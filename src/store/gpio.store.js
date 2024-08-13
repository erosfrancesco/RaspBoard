import { create } from "zustand";
import { WSBasePath } from "config";

import io from "socket.io-client";

const socket = io.connect(WSBasePath);
const pinout = {
    /** */
    4: {
        "name": "LED",
        "mode": "out"
    }
    /** */
};
const initialState = { pinout, socket, toggle: false };
export const statuses = {
    WAITING: 'WAITING',
    CONNECTED: 'CONNECTED',
    CLOSED: 'CLOSED'
};

export const writeModes = {
    DIGITAL: "Digital",
    PWM: "PWM"
}

const createSocketConnection = (pin, { onOpen = () => { }, onRead = () => { } }) => {
    socket.emit('pin-open', { pin });
    socket.on('pin-success-read-' + pin, onRead);
    socket.on('pin-success-open-' + pin, onOpen);
}

//
export const useGpioStore = create((set, get) => ({
    ...initialState,

    subscribeToPin: (pin, options) => {
        const state = get();
        const sub = state.pinout[pin];

        if (sub) {
            return sub;
        }

        createSocketConnection(pin, options);
        const { pinout } = state;
        pinout[pin] = {
            name: 'GPIO ' + pin,
            status: statuses.WAITING
        };
        set(() => ({ ...state, pinout }));

        return pinout[pin];
    },

    requestPinRead: (pin) => {
        socket.emit('pin-read-' + pin);
    },

    writeToPin: (pin, value, onWriteSuccess = () => { }) => {
        socket.emit('pin-write-' + pin, value);
        socket.on('pin-success-write-' + pin, onWriteSuccess)
    },

    writePWMToPin: (pin, value, onWriteSuccess = () => { }) => {
        socket.emit('pin-pwm-' + pin, value);
        socket.on('pin-success-pwm-' + pin, onWriteSuccess)
    },

    removePin: (pin) => {
        socket.off('pin-write-' + pin);
        socket.off('pin-success-write-' + pin);
        socket.off('pin-read-' + pin);
        socket.off('pin-success-read-' + pin);

        const state = get();
        const { [pin]: ws, ...other } = state.pinout;
        set((state) => ({ ...state, pinout: other }))
    },

    setPinProperty: (pin, name, value) => {
        const state = get();
        const { pinout, toggle } = state;
        const opts = pinout[pin] || {};
        const updatedToggle = toggle + 1;

        opts[name] = value;
        pinout[pin] = opts;

        set(() => ({ ...state, toggle: updatedToggle, pinout }));
    }
}));