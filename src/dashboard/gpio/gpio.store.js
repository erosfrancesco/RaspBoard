import { events, socket } from "store/socket.store";
import { create } from "zustand";

const connections = {
    4: 'CONNECTED'
};
const pinout = {
    4: {}
    /** 
    4: {
    },
    /*
    18: {
    }
    /** */
};
const initialState = { connections, pinout };

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
    socket.emit(events.PIN_OPEN.EVENT(), { pin });
    socket.on(events.PIN_READ.SUCCESS(pin), onRead);
    socket.on(events.PIN_OPEN.SUCCESS(pin), onOpen);
}

/**
 * @param {*} subscribeToPin (pin, { onOpen, onRead }) => void -> Setup pin ws
 * @param {*}
 */
export const useGpioStore = create((set, get) => ({
    ...initialState,

    setupBoardPinout: (pinout) => {
        set((state) => ({ ...state, pinout }))
    },

    /**
     * 
     * @param {*} pin 
     * @param {*} onRead 
     * @param {*} onRead 
     * @returns 
     */
    setupPin: (pin, onRead, onOpen) => {
        const { connections } = get();

        if (onRead) {
            socket.on(events.PIN_READ.SUCCESS(pin), onRead);
        }

        socket.on(events.PIN_OPEN.SUCCESS(pin), () => {
            connections[pin] = statuses.CONNECTED;
            set((state) => ({ ...state, connections }));

            if (onOpen) {
                onOpen(pin);
            }
        });


        if (connections[pin]) {
            return;
        }

        connections[pin] = statuses.WAITING;
        socket.emit(events.PIN_OPEN.EVENT(), { pin });
        set((state) => ({ ...state, connections }))
    },

    configPin: (pin, config) => {
        set(({ pinout, ...state }) => {
            pinout[pin] = config;

            return { ...state, pinout }
        });
    },
    /** */



    subscribeToPin: (pin, options) => {
        const state = get();
        const sub = state.connections[pin];

        if (sub) {
            return sub;
        }

        createSocketConnection(pin, options);
        const { pinout } = state;
        pinout[pin] = {
            name: 'GPIO ' + pin,
            status: statuses.WAITING
        };
        connections[pin] = true;

        set(() => ({ ...state, connections, pinout }));

        return pinout[pin];
    },

    requestPinRead: (pin) => {
        socket.emit(events.PIN_READ.EVENT(pin));
    },

    writeToPin: (pin, value, onWriteSuccess = () => { }) => {
        socket.emit(events.PIN_WRITE.EVENT(pin), value);
        socket.on(events.PIN_WRITE.SUCCESS(pin), onWriteSuccess)
    },

    writePWMToPin: (pin, value, onWriteSuccess = () => { }) => {
        console.log('sending', pin, value)
        socket.emit(events.PIN_PWM.EVENT(pin), value);
        socket.on(events.PIN_PWM.SUCCESS(pin), onWriteSuccess)
    },

    removePin: (pin) => {
        socket.off(events.PIN_WRITE.EVENT(pin));
        socket.off(events.PIN_WRITE.SUCCESS(pin));
        socket.off(events.PIN_READ.EVENT(pin));
        socket.off(events.PIN_READ.SUCCESS(pin));

        const { connections } = get();
        connections[pin] = false;

        set((state) => ({ ...state, connections }))
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