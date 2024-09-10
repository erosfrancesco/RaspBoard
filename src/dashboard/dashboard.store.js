import { create } from "zustand";

const initialState = {
    positions: [
        {
            top: 30,
            left: 5
        },
        {
            top: 30,
            left: 435
        }
    ],
};


//
export const useDashboardStore = create((set, get) => ({
    ...initialState,

    setPosition: (i, top, left) => {
        const { positions } = get();
        positions[i] = { top, left };
        set((state) => ({ ...state, positions }));
    },
    save: () => {
        const { positions } = get();
        const configuration = JSON.stringify(positions);
        localStorage.setItem('Dashboard', configuration);
    },
    load: () => {

        const positions = JSON.parse(localStorage.getItem('Dashboard'));
        set((state) => ({ ...state, positions }))
    },
    reset: () => set(() => (initialState))
}));