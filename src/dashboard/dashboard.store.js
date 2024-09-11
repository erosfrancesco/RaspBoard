import { create } from "zustand";
import WidgetBoard from "./board";
import WidgetCmd from "./cmd";

export const widgetMap = {
    "cmd": WidgetCmd, "board": WidgetBoard,
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
}));