import { create } from "zustand";
import { loadConfigFromLocal, parseLocalConfig, saveConfigToLocal, stringifyConfig } from "./utils";

const __boardSettingsKey = '__Board__Configuration'

const { gpios = [], i2c = {} } = loadConfigFromLocal(__boardSettingsKey) || {};
const gpiosString = stringifyConfig(gpios);
const i2cString = stringifyConfig(i2c);


const initialState = {
    gpios, i2c, gpiosString, i2cString
    // dataGroups: [['accelX', 'accelY', 'accelZ'], ['gyroX', 'gyroY', 'gyroZ']] // TODO: - 
};


//
export const useBoardStore = create((set, get) => ({
    ...initialState,

    setGpios: (gpios) => set((state) => {
        const gpiosString = stringifyConfig(gpios);
        return { ...state, gpios, gpiosString }
    }),
    setI2C: (i2c) => set((state) => {
        const i2cString = stringifyConfig(i2c);
        return { ...state, i2c, i2cString }
    }),

    // localstorage
    save: () => {
        const { i2c, gpios } = get();
        saveConfigToLocal({ i2c, gpios }, __boardSettingsKey);
    },
    load: () => {
        const { i2c, gpios } = loadConfigFromLocal(__boardSettingsKey);
        set((state) => ({ ...state, i2c, gpios }));
    },

    // string
    setGpiosString: (gpiosString) => set((state) => ({ ...state, gpiosString })),
    setI2CString: (i2cString) => set((state) => ({ ...state, i2cString })),
    stringify: stringifyConfig,
    parse: parseLocalConfig,
}));
