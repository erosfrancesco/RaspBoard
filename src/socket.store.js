import io from "socket.io-client";

const wsPath =
    "http://raspberrypi.local:80" /*
    "localhost:80";
/** */

export const events = {
    /** */
    PIN_OPEN: {
        EVENT: () => 'pin-open',
        SUCCESS: (pin) => 'pin-success-open-' + pin,
    },

    PIN_READ: {
        EVENT: (pin) => 'pin-read-' + pin,
        SUCCESS: (pin) => 'pin-success-read-' + pin,
    },

    PIN_WRITE: {
        EVENT: (pin) => 'pin-write-' + pin,
        SUCCESS: (pin) => 'pin-success-write-' + pin,
    },

    PIN_PWM: {
        EVENT: (pin) => 'pin-pwm-' + pin,
        SUCCESS: (pin) => 'pin-success-pwm-' + pin,
    },

    SERVO_WRITE: {
        EVENT: (pin) => 'pin-servo-' + pin,
        SUCCESS: (pin) => 'pin-success-servo-' + pin,
    },
    /** */

    /** */
    SHELL: {
        SEND: () => 'shell-send',
        OUTPUT: () => 'shell-output'
    }
    /** */
};

export const socket = io.connect(wsPath);

// socket.close()
// socket.emit()
// socket.on()

socket.on('connected', () => console.log('Connected to WS'))
export default socket;