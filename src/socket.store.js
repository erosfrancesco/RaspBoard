import io from "socket.io-client";

const wsPath =
    // "http://raspberrypi.local:80" /*
    "localhost:80";
/** */

export const socket = io.connect(wsPath);

// socket.close()

socket.on('connect', () => console.log('Connected to WS'))
socket.on('disconnect', () => console.log('Disconnected to WS'))
socket.on('error', () => console.log('Socket error: ', error))


export default socket;