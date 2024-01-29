import { Link } from "react-router-dom"
import "./Navbar.css"
function Navbar() {
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
                    <span>My Profile  </span>
                    <div className="navbar-dropdown-content">
                    <Link className="navbar-dropdown-content-link" to="/">Manage</Link>
                    <Link className="navbar-dropdown-content-link" to="/">Logout</Link>
                    </div>
                </div>
            </div>
          </div>
    )
}
export default Navbar