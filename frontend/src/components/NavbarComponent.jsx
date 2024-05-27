import React, { useContext ,useEffect} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarComponent() {
    const { user, logout,setUser: setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setAuthUser(storedUser);
        }
      }, []);

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">PAWPAW</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                    <Nav className="me-auto ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Sign out</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
