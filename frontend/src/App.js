
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Homepage from './pages/Homepage';
import AdminCrud from './pages/AdminCRUD';
function App() {
  return (
    <Router>
    <NavbarComponent /> 
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/home" element={<Homepage />} />
      <Route path="/admincrud" element={<AdminCrud />} />
    </Routes>
    <FooterComponent/>
  </Router>
  );
}

export default App;
