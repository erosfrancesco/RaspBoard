import io from "socket.io-client";

const wsPath =
    "http://raspberrypi.local:80" /*
    "localhost:80";
/** */

export const socket = io.connect(wsPath);

// socket.close()
// socket.emit()
// socket.on()

socket.on('connected', () => console.log('Connected to WS'))
export default socket;