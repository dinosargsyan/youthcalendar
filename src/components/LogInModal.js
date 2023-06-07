import React, { useState, useConext, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import fbService from '../api/fbService';
import GlobalContext from '../context/GlobalContext';
import Account from './Account';

function LogInModal() {
  const context = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const loginHandler = async () => {
 const user =  await fbService.login(credentials);
  console.log("userik",user);
        if (user === undefined) {
          console.log("credentials", credentials);
          context.setIsLogin(true);
          console.log("userLogin", user);
          console.log("context", context.isLogin);
        }
    

    console.log("this is user", credentials);
    // context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
    // localStorage.setItem("user", JSON.stringify(user));
    // history.push("/profile");


  }

  return (
    <>
      {/* {context.isLogin ? <Account /> : <Button variant="outline-secondary" onClick={handleShow}>Log In</Button>} */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => changeHandler('email', e.target.value)}

              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => changeHandler('password', e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={loginHandler}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LogInModal;
