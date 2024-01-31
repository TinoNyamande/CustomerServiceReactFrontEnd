import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"


export default function Landingpage() {
    const tokenExists = !!Cookies.get('token')
    if (!tokenExists) {
           return (
            <Navigate to ="/login" replace/>
           )
    }
    else {
        return <Navigate to ="/home" />
    }
}