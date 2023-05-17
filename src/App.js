import './App.css';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
