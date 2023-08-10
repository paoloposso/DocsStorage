import Home from './components/Home';
import React, { useState } from 'react';
import Menu from './components/Menu';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Files from './components/File/FilesIndex';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import LoginPage from './components/Login/LoginPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn && <Menu />}
      <Router>
        <Container>
          <Routes>
            <Route
              exact
              path="/"
              element={isLoggedIn ? <Home /> : <LoginPage onLogin={handleLogin} />}
            />            
            <Route path="/about" element={<About />} />
            <Route path="/files" element={<Files />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
