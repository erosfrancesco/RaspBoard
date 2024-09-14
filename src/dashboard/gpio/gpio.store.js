import { events, socket } from "store/socket.store";
import { create } from "zustand";


const initialState = {
    pinout: {}
};

export const statuses = {
    WAITING: 'WAITING',
    CONNECTED: 'CONNECTED',
    CLOSED: 'CLOSED'
};

export const writeModes = ["Digital", "PWM", "Servo"]

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

    // set pin attribute
    setPinAttribute: (widgetName, name, value) => {
        const { pinout } = get();
        pinout[widgetName] = pinout[widgetName] || {};
        pinout[widgetName][name] = value;
        set((state) => ({ ...state, pinout }));
    },



    /*
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
        const { pinout } = get();

        if (onRead) {
            socket.on(events.PIN_READ.SUCCESS(pin), onRead);
        }

        socket.on(events.PIN_OPEN.SUCCESS(pin), () => {
            pinout[pin].status = statuses.CONNECTED;
            set((state) => ({ ...state, pinout }));

            if (onOpen) {
                onOpen(pin);
            }
        });


        if (pinout[pin].status) {
            return;
        }

        pinout[pin].status = statuses.WAITING;
        socket.emit(events.PIN_OPEN.EVENT(), { pin });
        set((state) => ({ ...state, pinout }))
    },

    configPin: (pin, config) => {
        set(({ pinout, ...state }) => {
            pinout[pin] = config;

            return { ...state, pinout }
        });
    },
    /** */



    subscribeToPin: (pin, options) => {
        const { pinout, ...state } = get();
        const sub = pinout[pin].status;

        if (sub) {
            return sub;
        }

        createSocketConnection(pin, options);
        pinout[pin] = {
            name: 'GPIO ' + pin,
            status: statuses.WAITING
        };

        set(() => ({ ...state, pinout }));

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
        socket.emit(events.PIN_PWM.EVENT(pin), value);
        socket.on(events.PIN_PWM.SUCCESS(pin), onWriteSuccess)
    },

    removePin: (pin) => {
        socket.off(events.PIN_WRITE.EVENT(pin));
        socket.off(events.PIN_WRITE.SUCCESS(pin));
        socket.off(events.PIN_READ.EVENT(pin));
        socket.off(events.PIN_READ.SUCCESS(pin));

        const { pinout } = get();
        delete pinout[pin].status;

        set((state) => ({ ...state, pinout }))
    }
}));