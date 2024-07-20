import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logImg from './Profile/log.svg';
import registerImg from './Profile/register.svg';
import homeIcon from './FreeLancer/homeicon.png';
import { auth, googleProvider, githubProvider } from './Firebase/Firebase.js';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Google sign-in success:", user);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log("GitHub sign-in success:", user);
      navigate("/");
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      displayAlert('* Please enter a valid email address.');
      valid = false;
    }

    if (password.length < 6) {
      displayAlert('* Password must be at least 6 characters.');
      valid = false;
    }

    if (valid) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login successful:', user);
        localStorage.setItem('user', JSON.stringify(user));

        displayAlert('Logged in');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        displayAlert('An error occurred during login');
        console.error('Error:', error.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let valid = true;

    if (!username) {
      displayAlert('* Username is required.');
      valid = false;
    }

    if (!emailPattern.test(email)) {
      displayAlert('* Please enter a valid email address.');
      valid = false;
    }

    if (password.length < 6) {
      displayAlert('* Password must be at least 6 characters.');
      valid = false;
    }

    if (valid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Signup successful:', user);
        displayAlert('Signed up. Now login');
      } catch (error) {
        displayAlert('An error occurred during signup');
        console.error('Error:', error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
    clearErrors();
  };

  const displayAlert = (message) => {
    alert(message);
  };

  const clearErrors = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <div className={`container1 ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <Link to="/" className="home-link">
              <img src={homeIcon} alt="Home" className="home-icon" />
            </Link>
            <h2 className="title">Step into UniCollab! Log In</h2>
            
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                className='input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                className='input'
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            <input type="submit" value="Login" className="btn1 solid" />
            <p className="social-text">Connect with Social Magic</p>
            <div className="social-media">
              <Link to="https://www.facebook.com" className="social-icon">
                <i className="fab fa-facebook-f" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <Link to="https://www.twitter.com" className="social-icon">
                <i className="fab fa-twitter" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <div onClick={handleGoogleSignIn} className="social-icon">
                <i className="fab fa-google" style={{ color: 'darkturquoise' }}></i>
              </div>
              <Link to="https://www.linkedin.com" className="social-icon">
                <i className="fab fa-linkedin-in" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <div onClick={handleGitHubSignIn} className="social-icon">
                <i className="fab fa-github" style={{ color: 'darkturquoise' }}></i>
              </div>
            </div>
          </form>

          <form className="sign-up-form" onSubmit={handleSignUp}>
            <h2 className="title">Start Journey with UniCollab</h2>
            <Link to="/" className="home-link">
              <img src={homeIcon} alt="Home" className="home-icon" />
            </Link>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                className='input'
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                className='input'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                className='input'
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </button>
            </div>
            <input type="submit" className="btn1" value="Sign Up" />
            <p className="social-text">Connect with Social Magic</p>
            <div className="social-media">
              <Link to="https://www.facebook.com" className="social-icon">
                <i className="fab fa-facebook-f" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <Link to="https://www.twitter.com" className="social-icon">
                <i className="fab fa-twitter" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <div onClick={handleGoogleSignIn} className="social-icon">
                <i className="fab fa-google" style={{ color: 'darkturquoise' }}></i>
              </div>
              <Link to="https://www.linkedin.com" className="social-icon">
                <i className="fab fa-linkedin-in" style={{ color: 'darkturquoise' }}></i>
              </Link>
              <div onClick={handleGitHubSignIn} className="social-icon">
                <i className="fab fa-github" style={{ color: 'darkturquoise' }}></i>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Step into UniCollab with a social login or create a new account.</p>
            <button className="btn1 transparent" id="sign-up-btn" onClick={toggleSignUpMode}>
              Sign Up
            </button>
          </div>
          <img src={logImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign in to continue your journey with UniCollab.</p>
            <button className="btn1 transparent" id="sign-in-btn" onClick={toggleSignUpMode}>
              Sign In
            </button>
          </div>
          <img src={registerImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
