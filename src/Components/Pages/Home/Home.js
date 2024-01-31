import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Home.css";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = !!Cookies.get("token");
    if (tokenExists) {
      const token = Cookies.get("token");
      const payload = jwtDecode(token);
      const userName = payload["username"];
      axios
        .get(`https://localhost:7005/api/Emails/GetMyEmails?email=${userName}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const tokenExists = !!Cookies.get("token");
  if (tokenExists == false) {
    return <Navigate to="/login" replace />;
  }

  const onRowClick = (item) => {
    const url = `outstanding-emails/${item.id}`;
    navigate(url);
  };
  return (
    <div className="my-page-home container">
      <div className="home-header">
        <h3>All your Outstanding cases</h3>
        <p></p>
        <input className="form-control" placeholder="Search" />
      </div>
      <hr></hr>
      <div className="my-table-container">
        <div className="my-table-row my-table-header">
          <div className="my-small-column my-table-column">
            <p className="table-text-header">Date</p>
          </div>
          <div className="my-small-column my-table-column">
            <p className="table-text-header">Time</p>
          </div>
          <div className="my-big-column my-table-column">
            <p className="table-text-header">Subject</p>
          </div>
        </div>
        <div className="my-table-body">
        {data.map((item,index) => (
              <div key={index} className="my-table-row my-table-body-row" onClick={(()=>{
                onRowClick(item)
              })}>
                <div className="my-small-column my-table-column">
                <p className="table-text">
                  {moment(item.emailDate).format("D/M/YYYY")}
                </p>
                </div>
                <div className="my-small-column my-table-column">
                <p className="table-text">
                  {moment(item.emailDate).format("HH:MM:SS")}
                </p>
                </div>
                <div className="my-big-column my-table-column">
                <p className="table-text">
                  {item.subject}
                </p>
                </div>
              </div>
            ))}
            </div>
      </div>
      {/* <table className="table table-sm home-table table-bordered ">
        <thead>
          <tr>
            <th>
              <p className="table-text-header">Date</p>
            </th>
            <th>
              <p className="table-text-header">Time</p>
            </th>
            <th>
              {" "}
              <p className="table-text-header">Subject</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => {
                onRowClick(item);
              }}
            >
              <td>
                <p className="table-text">
                  {moment(item.emailDate).format("HH:MM:SS")}
                </p>
              </td>
              <td>
                <p className="table-text">
                  {moment(item.emailDate).format("D/M/YYYY")}
                </p>
              </td>
              <td>
                <p className="table-text">{item.subject}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
//<td><Link to={`outstanding-emails/${item.id}`} >{item.id}</Link></td>
export default Home;
