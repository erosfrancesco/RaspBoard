import { create } from "zustand";

const initialState = {
    lastCommand: null,
    lastCommandOutput: null,
    rootFolder: '/'
};


//
export const useShellStore = create((set, get) => ({
    ...initialState,
    reset: () => set(() => (initialState)),

    setLastCommand: (lastCommand) => set((state) => ({
        ...state,
        lastCommand
    })),

    setCommandOutput: (lastCommandOutput) => set((state) => ({
        ...state,
        lastCommandOutput
    })),

    setRootFolder: (rootFolder) => set((state) => ({
        ...state,
        rootFolder
    })),
}));