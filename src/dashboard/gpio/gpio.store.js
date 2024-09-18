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

export const useGpioStore = create((set, get) => ({
    ...initialState,

    setPinConfig: (widgetName, config) => {
        const { pinout } = get();
        pinout[widgetName] = config;
        set((state) => ({ ...state, pinout }));
    },

    setPinAttribute: (widgetName, name, value) => {
        const { pinout } = get();
        pinout[widgetName] = pinout[widgetName] || {};
        pinout[widgetName][name] = value;
        set((state) => ({ ...state, pinout }));
    }
}));