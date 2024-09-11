import './App.css';
import Dashboard from 'dashboard';
import Alert from 'components/alert';


function App() {
  return (
    <div className="app app-wrapper">
      <Dashboard className="app app-body" />
      <Alert />
    </div>
  );
}

export default App;