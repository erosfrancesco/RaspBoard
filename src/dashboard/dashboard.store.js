import { create } from "zustand";

import WidgetShell from "./shell";
import WidgetGPIO from "./gpio";
import WidgetI2C from "./i2c";

export const widgetMap = {
    "Shell": WidgetShell,
    "Gpio": WidgetGPIO,
    "I2C": WidgetI2C
};
export const widgetDefault = WidgetShell;

const initialState = {
    widgets: {}
};


//
export const useDashboardStore = create((set, get) => ({
    ...initialState,
    reset: () => set(() => (initialState)),

    setPosition: (i, top, left) => {
        const { widgets } = get();
        widgets[i] = { ...widgets[i], top, left };
        set((state) => ({ ...state, widgets }));
    },

    saveWidgets: () => {
        const { widgets } = get();
        const configuration = JSON.stringify({ widgets });
        localStorage.setItem('Dashboard', configuration);
    },

    loadWidgets: () => set((state) => {
        const { widgets = {} } = JSON.parse(localStorage.getItem('Dashboard')) || {};

        return {
            ...state,
            widgets
        }
    }),

    addWidget: (name, type) => set((state) => {
        const { widgets = {} } = state;
        widgets[name] = { type }

        return {
            ...state,
            widgets
        }
    }),

    removeWidget: (name) => set((state) => {
        const { widgets = {} } = state;
        delete widgets[name];

        return {
            ...state,
            widgets
        }
    }),
}));