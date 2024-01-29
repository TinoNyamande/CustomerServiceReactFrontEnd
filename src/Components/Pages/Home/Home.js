import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useEffect,useState } from "react"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css"
import { Link } from "react-router-dom";
import "./Home.css"
import { Navigate } from "react-router-dom";

function Home () {
    const [data ,setData] = useState([])
    useEffect(()=>{
        const tokenExists = !!Cookies.get('token')
         if (tokenExists){
            const token = Cookies.get("token");
            const payload = jwtDecode(token);
            const userName = payload["username"];
            console.log(userName)
            axios.get(`https://localhost:7005/api/Emails/GetMyEmails?email=${userName}`)
                 .then(response =>{
                  setData(response.data)
                  console.log(data)
                 })
                 .catch(error=>{
                  console.log(error)
                 })
         }

    },[])

    const tokenExists = !!Cookies.get('token')
    if (tokenExists == false) {
      return (
          <Navigate to = "/login" replace/>
      )
  }
    return (
        <div className="home container">
            <div className="home-header">
                <h3>All your Outstanding cases</h3>
                <input className="form-control" name="search" placeholder="Search"/>
            </div>
            <hr></hr>
            <table className="table home-table">
                <thead>
                    <tr>
                        <th>Case Id</th>
                        <th>Email Date</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                
                <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td><Link to={`outstanding-emails/${item.id}`} >{item.id}</Link></td>
                                <td>{item.emailDate}</td>
                                <td>{item.subject}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}
export default Home