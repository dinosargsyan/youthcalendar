import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import fbService from '../api/fbService';
import GlobalContext from '../context/GlobalContext';
import Account from './Account';

const SignUpModal = () => {
  const context = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    displayName: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeHandler = (name, value) => {
    setCredentials({
        ...credentials,
        [name]: value
    })
}
const SignupHandler = async () => {
    try {

     const user = await fbService.signup(credentials);
      if(user!==null){
        console.log("credentials", credentials);
        context.setIsLogin(true);
        console.log("signupcontext", context.isLogin);
      }

     
        // setIsLogin(true);
       // context.dispatch({ type: actionTypes.SET_USER, payload: { user } });
       // localStorage.setItem("user", JSON.stringify(user));
       // history.push("/profile");



    } catch (err) {

    }
    
}
  return (
    <>
    {/* {context.isLogin ? <Account /> :       <Button variant="outline-primary" onClick={handleShow}>  Sign Up </Button>} */}
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                autoFocus
                onChange={(e)=> changeHandler('displayName', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e)=> changeHandler('email', e.target.value)}
                
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
               type="password"
               onChange={(e)=> changeHandler('password', e.target.value)}  />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={SignupHandler}>
           Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SignUpModal;
