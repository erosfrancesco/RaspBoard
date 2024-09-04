import WidgetBoard from './board';
import WidgetCmd from './cmd';
import './index.css';

// TODO: - Drag and drop
// TODO: - Align

const styles = {
    board: {
        top: '30px',
        left: '30px'
    },
    cmd: {
        top: '30px',
        left: '400px'
    }
};

function Dashboard({ className = "" }) {
    return (
        <div className={className + " app-dashboard"}>
            <div className='app-dashboard-bg app-bg-square'>
                <div className='app-dashboard-bg'></div>
            </div>
            <WidgetBoard style={styles.board} className='app-dashboard-widget' />
            <WidgetCmd style={styles.cmd} className='app-dashboard-widget' />
        </div>
    );
}

export default Dashboard;
