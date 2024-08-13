import { AppTitle } from 'components/typography';
import './App.css';
import Board from 'sections/board';

function App() {
  return (
    <div className="app app-wrapper">
      <header className="app app-header">
        <AppTitle>Raspberry PI Socket GPIO</AppTitle>
      </header>

      <Board className="app app-body" />
    </div>
  );
}

export default App;