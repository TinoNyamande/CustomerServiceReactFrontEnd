import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import "./Navbar.css"

import { useEffect, useState } from "react"
function Navbar() {
    const [name , setName] = useState("")

    useEffect(()=>{
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
                <Link className="navbar-middle-section-link" to="/">Outstanding</Link>
                <Link className="navbar-middle-section-link" to="/">Completed</Link>
            </div>
            <div className="navbar-right-section">
                <div className="navbar-dropdown">
                    <span>{name}</span>
                    <div className="navbar-dropdown-content">
                    <Link className="navbar-dropdown-content-link" to="/">Manage</Link>
                    <Link className="navbar-dropdown-content-link" to="/logout">Logout</Link>
                    </div>
                </div>
            </div>
          </div>
    )
}
export default Navbar