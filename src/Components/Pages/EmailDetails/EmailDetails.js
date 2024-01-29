import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Overlay from "../../Layout/Overlay/Overlay";
import EmailBody from "../EmailBody/EmailBody";
import "./EmailDetails.css"


function EmailDetails({ match }) {
  // const itemId = match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    debugger
    setIsLoading(true)
    const tokenExists = !!Cookies.get('token')
   if (tokenExists) {
    axios
      .get(
        `https://localhost:7005/api/Emails/EmailDetails?Id=${id}`
      )
      .then((response) => {
        setData(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
   }

  }, []);
 
  const tokenExists = !!Cookies.get('token')
  if (tokenExists == false) {
    return (
        <Navigate to = "/login" replace/>
    )
}
  return (
    <div className="container applicatin-form-container">
      <div className="row">
        <div className="col-md-12">
          <div className="archive-header-container">
            <h2>{data.subject}</h2>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-12">
          <div className="app-form-container">
            <div className="archive-form-upload">
              <div className="app-form-box">
                <label>Case Id</label>
                <input
                  name="id"
                  className="form-control"
                  value={data.id}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>Email Date</label>
                <input
                  name="emailDate"
                  className="form-control"
                  type="text"
                  value={data.emailDate}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>From</label>
                <input
                  name="from"
                  className="form-control"
                  type="text"
                  value={data.from}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <label>Subject</label>
                <input
                  name="subject"
                  className="form-control"
                  type="text"
                  value={data.subject}
                  readOnly
                />
              </div>
              <div className="app-form-box">
                <button className="btn my-btn form-control">Reply</button>
              </div>
            </div>

            <div className="document-preview" dangerouslySetInnerHTML={{ __html:data.body}}>
          
             </div>

          </div>
        </div>
      </div>
      <Overlay outlaymessage="Saving" isLoading={isLoading} />
    </div>
  );
}
export default EmailDetails;
