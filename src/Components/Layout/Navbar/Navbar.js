import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import "./Navbar.css"
import { useAuth } from "../../Auth/AuthContext"

import { useEffect, useState } from "react"
function Navbar() {
    const [name , setName] = useState("")
    const {isAdmin} = useAuth();

    useEffect(()=>{
        console.log(isAdmin)
        const token = Cookies.get("token");
        const payload = jwtDecode(token);
        const userName = payload["username"]
        setName(userName)
    })
    return (
        <div className="navbar-container">
            <div className="navbar-left-section">
                <span>made by Tino N</span>
            </div>
            <div className="navbar-middle-section">
                {!isAdmin && (<Link className="navbar-middle-section-link" to="/">Outstanding</Link>)}
                {!isAdmin && (<Link className="navbar-middle-section-link" to="/">Completed</Link>)}
                {isAdmin && (<Link className="navbar-middle-section-link" to="/">Escalated</Link>)}
                {isAdmin && (<Link className="navbar-middle-section-link" to="outstanding-cases">View Outstanding</Link>)}
                {isAdmin && (<Link className="navbar-middle-section-link" to="/archieve">Archive</Link>)}
            </div>
            <div className="navbar-right-section">
                <div className="navbar-dropdown">
                    <span>{name}</span>
                    <div className="navbar-dropdown-content">
                    <Link className="navbar-dropdown-content-link" to="/">Manage</Link>
                    {isAdmin && (<Link className="navbar-dropdown-content-link" to="/">Add User</Link>)} 
                    <Link className="navbar-dropdown-content-link" to="/logout">Logout</Link>
                    </div>
                </div>
            </div>
          </div>
    )
}
export default Navbar