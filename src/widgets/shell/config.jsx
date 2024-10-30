import './index.css';
import Input from 'components/input/input';
import { useShellStore } from './shell.store';

/**
 * root folder
 */
// TODO: - Multiple shells?
export function WidgetShellConfig({ widgetKey }) {
    const { rootFolder, setRootFolder } = useShellStore();

    return <div>
        <div className='app-row'>
            <Input value={rootFolder} onEnter={setRootFolder} label="Root Folder" />
        </div>
    </div>
}

export default WidgetShellConfig;