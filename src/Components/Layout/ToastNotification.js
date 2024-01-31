import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import "./ToastNotification.css"


export default function ToastNotification(props) {
  const [show, setShow] = useState(false);
  //()=>{setShow(false)}

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <Row >
        <Col  xs={24}>
          <Toast className='my-toast-container' onClose={() => setShow(false)} show={props.show} delay={props.delay} >
            <Toast.Header>
              <h2 className="me-auto my-toast-header">{props.title}</h2>
            </Toast.Header>
            <Toast.Body className='my-toast-body'>
                <div>
                    <p className='my-toast-body-text'>
                    {props.message}
                    </p>
                </div>
                
                </Toast.Body>
            <div className='my-toast-close-button-container'>
            <Button className='btn btn-sm my-toast-close-button form-control' hidden={props.isHidden} onClick={props.closeModal}>Close</Button>
          </div>
          </Toast>
         
        </Col>
      </Row>
    </div>

  );
}

