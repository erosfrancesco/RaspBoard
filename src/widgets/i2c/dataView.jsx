import { AppTextLabel } from 'components/typography';
import './index.scss';
import { useI2CStore } from './i2c.store';


function I2CDatum({ name, value }) {
    const { dataSchema } = useI2CStore();

    const computeValue = () => {
        const datum = (dataSchema || []).find((el) => el.label === name);
        const { scale = 1, precision = 0, offset = 0 } = datum || {}
        return (Number(offset) + (Number(value) / Number(scale))).toFixed(precision)
    };

    return <div className='app-widget-i2c-datum'>
        <AppTextLabel>{name}:</AppTextLabel>
        <AppTextLabel>{computeValue()}</AppTextLabel>
    </div>
}

export function WidgetI2CDataView({ data }) {
    const {
        dataGroups
    } = useI2CStore();

    const nonGroupedKeys = [];
    const groupedKeys = Object.keys((data || {})).map((name) => {
        const match = (dataGroups || [[]]).map(group => group.includes(name)).includes(true);
        if (match) {
            return name;
        }

        nonGroupedKeys.push(name);
    });

    return (<div className='app-widget-i2c'>

        {dataGroups.map((group) => {
            return <div className='app-row'>{group.map((name) => {
                const value = (data || {})[name];
                return <I2CDatum key={name} name={name} value={value} />
            })}</div>
        })}

        <div className='app-row'>
            {nonGroupedKeys.map((name) => {
                const value = data[name];
                return <I2CDatum key={name} name={name} value={value} />
            })}
        </div>
    </div>);
}

export default WidgetI2CDataView;
