import { useState } from "react";

const titlesDefault = ['Home', 'Profile'];

const pagesDefault = [
    <p>Home</p>,
    <p>Profile</p>,
];

export function Tabs({ titles = titlesDefault, pages = pagesDefault, ...props }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const updateSelected = (i) => (e) => {
        setSelectedIndex(i);
    };

    return <div {...props}>
        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            {titles.map((title, i) => {
                const isSelected = i === selectedIndex;

                return <li className="nav-item" role="presentation" key={i}>
                    <button className={"nav-link" + (isSelected ? " active" : "")}
                        type="button" role="tab"
                        onClick={updateSelected(i)}
                        aria-selected={isSelected}>
                        {title}
                    </button>
                </li>
            })}
        </ul>

        <div>
            {pages[selectedIndex]}
        </div>
    </div>
}

export default Tabs