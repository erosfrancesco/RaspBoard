import { AppTitle } from 'components/typography';
import './App.css';
import Dashboard from 'dashboard';
import Alert from 'components/alert';


function App() {
  return (
    <div className="app app-wrapper">
      {/*}
      <div className="app app-header">
        <AppTitle>Raspberry PI Socket GPIO</AppTitle>
      </div>
      {/** */}

      <Dashboard className="app app-body" />
      <Alert />
    </div>
  );
}

export default App;