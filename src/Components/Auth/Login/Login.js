import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Overlay from "../../Layout/Overlay/Overlay";
function Login() {
  const [inputs, setInputs] = useState({});
  const [token,setToken] = useState("");
  const [isSaving , setIsSaving] = useState(false);
  const outlaySavingMessage = "Logging in";

 useEffect(()=>{
    
  const tokenExists = !!Cookies.get('token')
  if (tokenExists == true ) {
    setToken(tokenExists);
  }
 },[])

 if (token) {
    console.log(token)
    debugger
    return <Navigate to="/" replace/>
 }


  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputs({...inputs , [name]:value})
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
    setIsSaving(true);
    axios.post("https://localhost:7005/api/Auth/Login" ,inputs)
          .then (response => {
            console.log(response.data);
            const token = response.data.token;
            Cookies.set("token",token,{expires:1,secure:true});
            alert("Logged in")
            setIsSaving(false);
            return <Navigate to="/" replace/>

          })
          .catch (error => {
            console.log(error.response.data.message)
            setIsSaving(false);
          })
    
  };

  return (
    <div className="my-login-container">
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
    </div>
  );
}
export default Login;
