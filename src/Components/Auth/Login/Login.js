import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Overlay from "../../Layout/Overlay/Overlay";
import ToastNotification from "../../Layout/ToastNotification";
import { useAuth } from "../AuthContext";
function Login() {
  const [inputs, setInputs] = useState({});
  const [token,setToken] = useState("");
  const [isSaving , setIsSaving] = useState(false);
  const outlaySavingMessage = "Logging in";
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [message,setMessage] = useState("");
  const { loggedIn, login, logout } = useAuth();

  
  const closeModal =() =>{
    setShow(false)
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputs({...inputs , [name]:value})
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    setErrorMessage("")
    setIsSaving(true);
    await axios.post("https://localhost:7005/api/Auth/Login" ,inputs)
          .then (response => {
            console.log(response.data);
            const token = response.data.token;
            Cookies.set("token",token,{expires:1,secure:true});
            
            setIsSaving(false);
            setTitle("Success")
            setMessage("Log in successful")
            login();
            setShow(true)
            setTimeout(()=>{
              setShow(false)
            },3000)
            
           setTimeout(()=>{
            navigate("/")
           },3000)

          })
          .catch (error => {
            console.log(error.response.data.message)
            setErrorMessage(error.response.data.message)
            setIsSaving(false);
          })
    
  };

  return (
    <div className="my-login-container">

    {!show && (
      <div className="my-login-page-container">
        <div className="my-login-logo-container">
          <img src="/logo512.png" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-login-form-box">
            <label>Email</label>
            <input onChange={handleChange} className="form-control" name="emailAdrress" value={inputs.emailAdrress||""} />
          </div>
          <div className="my-login-form-box">
            <label>Password</label>
            <input type="password" onChange={handleChange} className="form-control" name="password" value={inputs.password||""} />
          </div>
          {errorMessage && (<div className="error-message-container">
            <p>{errorMessage}</p>
            </div>)}
          <div className="my-login-remember-me">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary form-control">Login</button>
          </div>
          <div className="my-login-forgot-password">
            <Link className="my-login-forgot-password-link" to="/">
              Forgot password ?
            </Link>
          </div>
        </form>
        
        <Overlay outlaymessage= {outlaySavingMessage} isLoading={isSaving}/>
      </div>
    )}
    {show&& (
      <div className="my-modal-container">
             <ToastNotification title={title} message ={message} show={show} closeModal={closeModal} isHidden={true} delay={20000}/>
             </div>

    )}
    </div>
  );
}
export default Login;
