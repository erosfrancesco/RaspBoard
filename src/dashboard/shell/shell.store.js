import socket, { events } from "store/socket.store";
import { create } from "zustand";

const initialState = {
    lastCommand: null,
    lastCommandOutput: null /*
        'Hello commands output \
        Hello commands output Hello commands output Hello commands output \
        Hello commands output Hello commands output Hello commands output \
        Hello commands output Hello commands output Hello commands output \
        Hello commands output Hello commands output Hello commands output \
    '
    /** */
};


//
export const useShellStore = create((set, get) => ({
    ...initialState,
    reset: () => set(() => (initialState)),

    sendCommand: (command) => {
        console.log(command);

        socket.emit(events.SHELL.SEND(), { command });
        socket.on(events.SHELL.OUTPUT(), (lastCommandOutput) => {
            console.log(lastCommandOutput);
            set((state) => ({
                ...state,
                lastCommandOutput
            }));
        });

        set((state) => ({
            ...state,
            lastCommand: command
        }));
    },

    setCommandOutput: (lastCommandOutput) => set((state) => ({
        ...state,
        lastCommandOutput
    })),
}));