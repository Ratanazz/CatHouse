import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Homepage from './pages/Homepage';
import AdminCrud from './pages/AdminCRUD';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import RequestPage from './pages/RequestPage';
import CatDetail from './pages/CatDetail';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent /> 
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path="/home" element={<Homepage />} />
          <Route path="/cat/:id" element={<CatDetail />} />
          <Route path="/admincrud" element={<ProtectedRoute allowedRoles={['admin']} element={<AdminCrud />} />} />
          <Route path="/request" element={<ProtectedRoute allowedRoles={['admin']} element={<RequestPage />} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        <FooterComponent/>
      </Router>
    </AuthProvider>
  );
}

export default App;
