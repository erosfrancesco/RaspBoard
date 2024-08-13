import Input from "./input";
import "./hexadecimal.css";

/*
const convertToHex = (n) => n.toString(16);
const convertToDec = (n) => n.toString(10);
const isHex = (key) => {
    const regEx = /^[0-9a-fA-F]+$/;
    return regEx.test(key.toString());
}
/** */

export function HexadecimalInput({
    className,
    value,
    ...args
}) {
    const classNames = "app-input-hexadecimal" + (className ? className + " " : "");
    return <Input

        /**
        onKeyUp={(e) => {
            const key = e.key;
            console.log(key);

            if (key === "ArrowUp") {
                if (value < 255) {
                    setValue(value + 1);
                }
            }

            if (key === "ArrowDown") {
                if (value > 0) {
                    setValue(value - 1);
                }
            }

            if (key === "Backspace") { }

            if (isHex(key)) {
            } else {
                const a = value.slice(0, -1);
                setValue(a);
            }
            onKeyUp(e);
        }}
        /** */

        className={classNames}
        value={value}
        prefix="0x"
        maxLength="2"
        {...args}
    />
};

export default HexadecimalInput;
