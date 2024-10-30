import ExpansionPanel from '../components/expansionPanel';

function ConnectionPanel({ className }) {
    return (
        <ExpansionPanel title="Connections" className="app-dashboard-board-panel">
            <div style={{
                height: '50vh',
                overflowY: 'scroll'
            }}>
                <p>Hello panel</p>
                <div style={{ height: '100vh' }}></div>
            </div>
        </ExpansionPanel>
    );
}

export default ConnectionPanel;
