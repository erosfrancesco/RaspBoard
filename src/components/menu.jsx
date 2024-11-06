import { useLayoutStore } from '@/layout.store';
import './menu.scss';

/**
 * Hook that alerts clicks outside of the passed ref
 */
/*
function useOutsideAlerter(ref, onOutsideClick = () => { }) {
    useEffect(() => {
function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
    }
}
// Bind the event listener
document.addEventListener("mousedown", handleClickOutside);
return () => {
    // Unbind the event listener on clean up
    document.removeEventListener("mousedown", handleClickOutside);
};
    }, [ref]);
}
/** */


export function Menu() {
    /*
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        if (menuIsOpen) {
            setMenuContent(null);
        }
    });
    /** */

    const { menuIsOpen, menuContent, menuPosition } = useLayoutStore();
    const classNames = "app-menu" + (menuIsOpen ? "" : " app-menu-hide");

    return <div className={classNames} style={{
        top: menuPosition.y,
        left: menuPosition.x
    }}>
        {menuContent}
    </div>
}

export default Menu;