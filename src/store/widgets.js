import { create } from "zustand";
import { loadConfigFromLocal, parseLocalConfig, saveConfigToLocal, stringifyConfig } from "./utils";

const __widgetSettingsKey = '__Dashboard__Widgets'

const { widgets = {} } = loadConfigFromLocal(__widgetSettingsKey) || {};
const widgetsString = stringifyConfig(widgets);

const initialState = {
    widgets: [],
    widgetsString
};


//
export const useWidgetStore = create((set, get) => ({
    ...initialState,
    reset: () => set(() => (initialState)),


    // localstorage
    save: () => {
        const { widgets } = get();
        saveConfigToLocal({ widgets }, __widgetSettingsKey);
    },
    load: () => {
        const { widgets } = loadConfigFromLocal(__widgetSettingsKey);
        set((state) => ({ ...state, widgets }));
    },

    // string
    setWidgetsString: (widgetsString) => set((state) => ({ ...state, widgetsString })),
    stringify: stringifyConfig,
    parse: parseLocalConfig,

    // METHODS
    setWidgets: (widgets) => set((state) => {
        const widgetsString = stringifyConfig(widgets);
        return { ...state, widgets, widgetsString }
    }),

    setPosition: (i, top, left) => {
        const { widgets } = get();
        widgets[i] = { ...widgets[i], top, left };
        set((state) => ({ ...state, widgets }));
    },

    /*
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
    /** */
}));