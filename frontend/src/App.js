
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Homepage from './pages/Homepage';
import AdminCrud from './pages/AdminCRUD';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
function App() {
  return (
    <Router>
    <NavbarComponent /> 
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route path="/home" element={<Homepage />} />
      <Route path="/admincrud" element={<AdminCrud />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />


    </Routes>
    <FooterComponent/>
  </Router>
  );
}

export default App;
