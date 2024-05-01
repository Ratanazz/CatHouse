
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Homepage from './pages/Homepage';
function App() {
  return (
    <Router>
    <NavbarComponent /> 
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/home" element={<Homepage />} />
    </Routes>
    <FooterComponent/>
  </Router>
  );
}

export default App;
