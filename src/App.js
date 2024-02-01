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
import AdminHome from "./Components/Admin/Home/AdminHome";
import Archive from "./Components/Admin/Archieve/Archieve";
import OutstandingCases from "./Components/Admin/Outstanding/OutstandingCases";
function App() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const { loggedIn, login, logout,isAdmin,makeAdmin , removeAdmin } = useAuth();

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
              <Route path="/dashboard" element={<Home />} />
              <Route path="/admin-dashboard" element={<AdminHome/>} />
              <Route path="/outstanding-cases" element={<OutstandingCases/>}/>
              <Route path="archieve" element = {<Archive/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="dashboard/outstanding-emails/:id" element={<EmailDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
