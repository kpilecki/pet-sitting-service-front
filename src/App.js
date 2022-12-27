import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage';
import MainMenu from './components/MainMenu';
import CustomerSignup from './pages/CustomerSignup';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/customer/UserPage';
import ServiceProviderSignup from './pages/ServiceProviderSignup';
import ServiceProviderHome from './pages/provider/ServiceProviderHome';
import PetList from "./pages/customer/PetList";
import Profile from "./pages/customer/Profile";
import MessagePage from "./pages/customer/MessagePage";
import CustomerOrders from "./pages/customer/CustomerOrders";
import ServiceProviderProfile from "./pages/provider/ServiceProviderProfile";
import PetEdit from "./pages/customer/PetEdit";
import ServiceProviderServices from "./pages/provider/ServiceProviderServices";

function App() {
  return (
    <div>
      <MainMenu />
      <div>
        <Routes>
            <Route exact path='/' element={ <Home /> } />
            <Route path='/signup' element={ <CustomerSignup /> } />
            <Route path='provider/signup' element={ <ServiceProviderSignup /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/:username' element={ <UserPage /> } />
            <Route path='/customer/pets' element={ <PetList /> } />
            <Route path='/customer/profile' element={ <Profile /> } />
            <Route path='/customer/messages' element={ <MessagePage /> } />
            <Route path='/customer/orders' element={ <CustomerOrders /> } />
            <Route path='/provider/home' element={ <ServiceProviderHome /> } />
            <Route path='/provider/profile' element={ <ServiceProviderProfile /> } />
            <Route path='/customer/pets/:id' element={ <PetEdit /> } />
            <Route path='/provider/services' element={ <ServiceProviderServices /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
