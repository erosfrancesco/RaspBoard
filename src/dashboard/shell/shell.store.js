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

    setLastCommand: (lastCommand) => set((state) => ({
        ...state,
        lastCommand
    })),

    setCommandOutput: (lastCommandOutput) => set((state) => ({
        ...state,
        lastCommandOutput
    })),
}));