import { create } from "zustand";

const initialState = {
    address: null,
    readFrequency: 0,
    dataStructure: null,
    deviceSetup: []

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
    dataStructure: {
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
    setReadFrequency: (readFrequency) => set((state) => ({ ...state, readFrequency })),
    setDataStructure: (dataStructure = []) => set((state) => ({ ...state, dataStructure })),
    setDeviceSetup: (deviceSetup) => set((state) => ({ ...state, deviceSetup })),
}));