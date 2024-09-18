import { create } from "zustand";

const initialState = {
    alertIsOpen: false,
    alertContent: null,

    tabSelected: null,
    tabContents: null,

    menuIsOpen: false,
    menuContent: null,
    menuPosition: {
        x: 0, y: 0
    }
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

    setMenuContent: (menuContent) => set((state) => {
        const menuIsOpen = menuContent ? true : false;
        return { ...state, menuContent, menuIsOpen }
    }),

    setMenuPosition: (x, y) => set((state) => ({
        ...state,
        menuPosition: {
            x: x || state.menuPosition.x,
            y: y || state.menuPosition.y
        }
    })),
}));