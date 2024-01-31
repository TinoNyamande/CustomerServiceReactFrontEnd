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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function EmailDetails({ match }) {
  // const itemId = match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <button className="btn btn-sm btn-primary form-control" onClick={handleShow} >Reply</button>
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
            
            </div>

            <div className="document-preview" dangerouslySetInnerHTML={{ __html:data.body}}>
          
             </div>

          </div>
        </div>
      </div>
      <Modal className="my-modal" show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reply Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Reply</Form.Label>
              <Form.Control as="textarea" rows={12} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <Overlay outlaymessage="Loading" isLoading={isLoading} />
    </div>
  );
}
export default EmailDetails;
