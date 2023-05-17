import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Files from './components/File/FilesHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';

const App = () => {
  return (
    <>
      <Menu></Menu>
      <Router>
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/files" element={<Files />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
