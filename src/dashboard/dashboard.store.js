import { create } from "zustand";
import WidgetBoard from "./board";
import WidgetShell from "./shell";

export const widgetMap = {
    "Shell": WidgetShell, "Board": WidgetBoard,
};

export const widgetDefault = WidgetBoard;

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
        const { widgets = {} } = JSON.parse(localStorage.getItem('Dashboard')) || {}; /*
        const widgets = {
            1: {
                type: Object.keys(widgetMap)[0]
            },
            2: {
                type: Object.keys(widgetMap)[1]
            }
        };
        /** */

        return {
            ...state,
            widgets
        }
    }),

    addWidget: (type) => set((state) => {
        const { widgets = {} } = state;
        const i = Object.keys(widgets).length + 1;
        widgets[i] = { type }

        return {
            ...state,
            widgets
        }
    }),
}));