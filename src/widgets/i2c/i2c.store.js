import { create } from "zustand";

const initialState = {
    address: null,
    readFrequency: 0,
    dataSchema: null,
    deviceSetup: [],
    dataGroups: [['accelX', 'accelY', 'accelZ'], ['gyroX', 'gyroY', 'gyroZ']]

    /*
    dataMap: {
        'accelX': '3B',	     // Accelerometer registers
        'accelY': '3D',	     //
        'accelZ': '3F',	     //
        'temp': '41',	     //	Temperature registers
        'gyroX': '43',	     // Gyroscope registers
        'gyroY': '45',	     //
        'gyroZ': '47', 	     //
    },
    dataSchema: {
        'accelX': {},
        'accelY': { precision: 2, scale: 1000 },
        'accelZ': {},
        'temp': { scale: 340, offset: 36.53, precision: 2 },
        'gyroX': {},
        'gyroY': {},
        'gyroZ': {},
    },
    /** */
};

//
export const useI2CStore = create((set, get) => ({
    ...initialState,

    setDeviceAddress: (address) => set((state) => ({ ...state, address })),
    setReadFrequency: (readFrequency) => set((state) => ({ ...state, readFrequency })),
    setDataSchema: (dataSchema = []) => set((state) => ({ ...state, dataSchema })),
    setDeviceSetup: (deviceSetup) => set((state) => ({ ...state, deviceSetup })),
}));