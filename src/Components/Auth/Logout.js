import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const { loggedIn, login, logout } = useAuth();

    useEffect(()=>{
        logout()
        Cookies.remove('token')
        const url = "/login"
        navigate(url)
    })
}