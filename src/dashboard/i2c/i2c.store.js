import { create } from "zustand";

const initialState = {
    address: null,
    readEvery: 0,
    /** */
    dataMap: {},
    dataParameters: {},
    /** */
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
    setDataMap: (dataMap = {}) => set((state) => ({ ...state, dataMap })),
    setReadInterval: (readEvery) => set((state) => ({ ...state, readEvery })),

    initializeDataParameters: (dataParameters = {}) => set((state) => ({ ...state, dataParameters })),

    setDataParameters: (name, { scale, offset, precision } = {}) => set(({ dataParameters, ...state }) => {
        dataParameters[name] = dataParameters[name] || {}
        const updatedScale = scale || dataParameters[name].scale || 1;
        const updatedOffset = offset || dataParameters[name].offset || 0;
        const updatedPrecision = precision || dataParameters[name].precision || 0;

        dataParameters[name] = {
            scale: updatedScale,
            offset: updatedOffset,
            precision: updatedPrecision
        };

        return { ...state, dataParameters }
    }),

    removeDataParameters: (name) => set(({ dataParameters, ...state }) => {
        delete dataParameters[name]

        return { ...state, dataParameters }
    })

}));