// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebaseConfig';
import './Login.css';

const auth = getAuth(firebaseApp);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful sign-in
        const user = userCredential.user;
        console.log('User signed in:', user);
        setLoginMessage('You have successfully logged in!');
        setTimeout(() => {
          navigate('/'); // Redirect to the home page
        }, 2000); // Delay in milliseconds
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setLoginMessage(errorMessage);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="login-box">
          <h1>Login</h1>
          {loginMessage && <p>{loginMessage}</p>} {/* Render login message if present */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-container">
            <button onClick={handleSignIn}>Sign in</button>
          </div>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
