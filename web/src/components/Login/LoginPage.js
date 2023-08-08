import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (username === '' || password === '') {
      setErrorMessage('Please fill in all fields');
    } else {
      // Simulate a successful login for demonstration
      onLogin(); // Call the provided onLogin function
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="login-box">
            <h2 className="text-center">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="login-button">
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form.Group>
              {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
