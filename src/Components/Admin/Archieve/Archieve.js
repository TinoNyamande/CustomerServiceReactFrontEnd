import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Nodata from "../../Layout/Nodata/Nodata";

export default function Archive() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  useEffect(() => {
    const tokenExists = !!Cookies.get("token");
    if (tokenExists) {
      const token = Cookies.get("token");
      const payload = jwtDecode(token);
      const userName = payload["username"];
      axios
        .get("https://localhost:7005/api/Emails/Archive")
        .then((response) => {
          console.log(data);
          console.log(data.length);
          login();
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
        <h3>Archieve</h3>
        <p></p>
        <input
          className="form-control"
          placeholder="Search"
          readOnly={data.length < 0 ? false : true}
        />
      </div>
      <hr></hr>
      {data.length < 1 && (
        <Nodata title="No data" message="There are currently no  emails" />
      )}
      {data.length > 0 && (
        <div className="my-table-container">
          <div className="my-table-row my-table-header">
          <div className="my-small-column my-table-column">
              <p className="table-text-header">Time Taken</p>
            </div>
            <div className="my-small-column my-table-column">
              <p className="table-text-header">Date</p>
            </div>

            <div className="my-mid-column my-table-column">
              <p className="table-text-header">User</p>
            </div>

         
          </div>
          <div className="my-table-body">
            {data.map((item, index) => (
              <div
                key={index}
                className="my-table-row my-table-body-row"
                onClick={() => {
                  onRowClick(item);
                }}
              >
                  <div className="my-small-column my-table-column">
                    <p className="table-text">{item.timeTaken}</p>
                  </div>
                  <div className="my-small-column my-table-column">

                  <p className="table-text">
                    {moment(item.timeResolved).format("D/M/YYYY")}
                  </p>
                </div>

                <div className="my-big-column my-table-column">
                  <p className="table-text">{item.assignedTo}</p>
                </div>
              
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
