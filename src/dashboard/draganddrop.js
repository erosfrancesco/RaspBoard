function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const { offsetX, offsetY } = ev;
    ev.dataTransfer.setData("id", ev.target.id)
    ev.dataTransfer.setData("offsetX", offsetX)
    ev.dataTransfer.setData("offsetY", offsetY)
}

function drop(ev) {
    ev.preventDefault();

    var id = ev.dataTransfer.getData("id");
    var offsetX = ev.dataTransfer.getData("offsetX");
    var offsetY = ev.dataTransfer.getData("offsetY");

    var el = document.getElementById(id);

    console.log(el);

    el.style.top = (Number(ev.y)
        - Number(offsetY)
    ) + 'px';
    el.style.left = (Number(ev.x)
        - Number(offsetX)
    ) + 'px';
}


export const Draggable = ({ children, onDragEnd = () => { }, onDragStart = () => { }, ...other }) => {
    const dragStart = (e) => { console.log(e); onDragStart(e); }
    const dragEnd = (e) => { onDragEnd(e); }

    return <div
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        draggable
        {...other}
    >
        {children}
    </div>
}

export const Droppable = ({ children }) => {
    const onDrop = () => { }
    return <div onDrop={onDrop}>{children}</div>
}


export default { Draggable, Droppable }