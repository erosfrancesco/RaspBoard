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

    /*
    sendCommand: (command) => {
        console.log(command);
        // const { sub } = get();
        socket.emit(events.SHELL.SEND(), { command });

        if (!sub) {
            socket.on(events.SHELL.OUTPUT(), (lastCommandOutput) => {
                console.log(lastCommandOutput);
                set((state) => ({
                    ...state,
                    lastCommandOutput
                }));
            });

            set((state) => ({
                ...state,
                sub: true
            }))
        }

        set((state) => ({
            ...state,
            lastCommand: command
        }));
    },
    /** */
}));