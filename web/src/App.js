import './App.css';
import ExpenseForm from './Pages/ExpenseForm';
import ExpenseList from './Pages/ExpenseList';

function App() {
  return (
    <div className="App">
          <h1>Expense Tracker</h1>
        <main className="App-main">
          <ExpenseForm />
          <ExpenseList />
        </main>
        <footer className="App-footer">
          <p>Expense Tracker with Sync &copy; {new Date().getFullYear()}</p>
        </footer>
    </div>
  );
}

export default App;
