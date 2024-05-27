import React, { useState, useContext } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data); // Log the response for debugging

            if (response.ok) {
                setLoginSuccess(true);
                login(data.token, data.user); // Store token and user info
            } else {
                setLoginSuccess(false);
                // Handle unsuccessful login, e.g., display an error message
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., display an error message
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
                    </MDBCol>
                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">LOGIN</span>
                            </div>
                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Login into your account</h5>
                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <MDBBtn type="submit" className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                            </form>
                            <a className="small text-muted" href="#!">Forgot password?</a>
                            {loginSuccess && <p className="text-success">Login successful!</p>}
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}><Link to="/register" style={{ color: '#393f81' }}>Don't have an account? Create New here</Link></p>
                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}

export default LoginPage;
