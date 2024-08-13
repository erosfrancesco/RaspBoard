
import { useEffect, useState } from "react";
import "./list.css";
import Button from "./button";


export function List({
    className,
    Item = () => { },
    items: initialItems = [],
    onItemsUpdate = () => { },
    ...args
}) {
    const [contents, setContents] = useState();
    const [items, setItems] = useState(initialItems);
    const [newItem, setNewItem] = useState();

    useEffect(() => {
        onItemsUpdate(items)
    }, [items]);

    const addItem = () => {
        items.push(newItem);
        setNewItem({});
        setItems(items);
        // onItemsUpdate(items);

        setContents(items.map((item, key) => <div key={key}>{
            Item({
                item,
                updateItem: (updates) => {
                    const updated = { ...items[key], ...updates }
                    items[key] = updated;
                    setItems(items);
                    // onItemsUpdate(items);
                }
            })
        }</div>));
    }

    const classNames = "app-list" + (className ? className + " " : "");

    return <div
        className={classNames}
        {...args}
    >
        {contents}
        <div>
            {Item({
                item: newItem,
                addItem,
                updateItem: (updates) => {
                    const updated = { ...(newItem || {}), ...updates };
                    setNewItem(updated)
                }
            })}
            <Button onClick={addItem}>+</Button>
        </div>
    </div>
};

export default List;
