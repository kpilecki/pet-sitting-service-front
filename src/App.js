import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MainMenu from './components/MainMenu';
import CustomerSignup from './pages/CustomerSignup';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <MainMenu />
      <div>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route path='/signup' element={ <CustomerSignup /> } />
          <Route path='/login' element={ <LoginPage /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
