import { useLayoutStore } from '@/layout.store'
import './tabs.css'
import { TextNormal } from './typography';

export function Tabs() {
    const { tabContents, tabSelected, setTabSelected } = useLayoutStore();

    return <div>
        <div className='app-tabs-title-row'>
            {tabContents && Object.keys(tabContents).map((tabTitle) => {
                const selected = tabTitle === tabSelected;
                const classNames = 'app-tabs-title-wrapper' + (selected ? ' selected' : '');
                const onClick = () => setTabSelected(tabTitle);

                return <div className={classNames} onClick={onClick} key={tabTitle}>
                    <TextNormal>{tabTitle}</TextNormal>
                </div>
            })}
        </div>
        <div className='app-tabs-content'>{tabContents && tabContents[tabSelected]}</div>
    </div>
}

export default Tabs;