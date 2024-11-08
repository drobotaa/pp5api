import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/SingInUpForm.module.css';
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import SignUp from '../../assets/SignUpp.jpg'
import { useNotification } from "../../hooks/useNotification";

import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect('loggedIn')
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  })

  const { username, password1, password2 } = signUpData;
  const { showNotification, Notification } = useNotification();

  const [errors, setErrors] = useState({});


  const history = useHistory()

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      showNotification("Successfully Signed Up! Redirecting to Sign in 3 seconds...")
      setTimeout(() => {
        history.push('/signin');
      }, 3000);
    } catch (err) {
      setErrors(err.response?.data)
      // showNotification("Registration failed. Please check the form again.") Optional
    }
  }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign Up</h1>

          <Notification />

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={username}
                className={styles.Input}
                type="text"
                placeholder="Enter username"
                name="username" />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={password1}
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1" />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={password2}
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2" />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.WideButton} ${btnStyles.ColorChange}`} type="submit">
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          src={SignUp}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;