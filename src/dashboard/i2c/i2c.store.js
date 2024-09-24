import { create } from "zustand";

const initialState = {
    address: null,
    readEvery: 0,
    dataParameters: [],
    writeConfigs: []

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
    dataParameters: {
        'accelX': {},
        'accelY': { precision: 2, scale: 1000 },
        'accelZ': {},
        'temp': { offset: 340, precision: 2 },
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
    setReadInterval: (readEvery) => set((state) => ({ ...state, readEvery })),
    setDataParameters: (dataParameters = []) => set((state) => ({ ...state, dataParameters })),
    setWriteConfigs: (writeConfigs) => set((state) => ({ ...state, writeConfigs })),
}));