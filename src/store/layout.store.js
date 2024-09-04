import { create } from "zustand";

const initialState = {
    alertIsOpen: false,
    alertContent: null,

    tabSelected: null,
    tabContents: null
};


//
export const useLayoutStore = create((set, get) => ({
    ...initialState,

    setAlertContent: (alertContent) => set((state) => {
        const alertIsOpen = alertContent ? true : false;
        return { ...state, alertContent, alertIsOpen }
    }),

    setTabContents: (tabContents) => set((state) => {
        if (!tabContents) {
            return { ...state, tabContents: null, tabSelected: null };
        }

        const tabSelected = Object.keys(tabContents)[0];
        return { ...state, tabContents, tabSelected };
    }),

    setTabSelected: (tabSelected) => set((state) => ({ ...state, tabSelected })),
}));