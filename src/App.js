import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home";
import EmailDetails from "./Components/Pages/EmailDetails/EmailDetails";
import Landingpage from "./Components/Pages/Landingpage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Logout from "./Components/Auth/Logout";
import { AuthProvider } from "./Components/Auth/AuthContext";
import { useAuth } from "./Components/Auth/AuthContext";
function App() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const { loggedIn, login, logout } = useAuth();

  useEffect(() => {
    const getToken = async () =>{
     // setLoggedIn(!!Cookies.get('token'))

    }
    getToken()
  }, []);

  return (
      <Router className="">
      <div className="app-container">
        <div className="row ">
          <div className="col-md-12">{loggedIn && <Navbar />}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="home/outstanding-emails/:id" element={<EmailDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
