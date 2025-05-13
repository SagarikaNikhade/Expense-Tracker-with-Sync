import './App.css';
import MainRoute from './Context/MainRoute';
import Navbar from './Context/Navbar';

function App() {
  return (
    <div className="App">
          <h1>Expense Tracker</h1>
        <main className="App-main">
          <Navbar/>
          <MainRoute />
        </main>
    </div>
  );
}

export default App;
