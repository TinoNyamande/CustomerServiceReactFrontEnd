import logo from './logo.svg';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Home from './Components/Pages/Home/Home';
import Overlay from './Components/Layout/Overlay/Overlay'
import EmailDetails from './Components/Pages/EmailDetails/EmailDetails';
function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='outstanding-emails/:id' element = {<EmailDetails/>} />
        </Routes>
      </Router>
  );
}

export default App;
