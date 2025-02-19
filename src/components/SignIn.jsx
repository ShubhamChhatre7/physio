import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, X } from 'lucide-react';
import './Auth.css';
import Logo from './Logo.png';
import supabase from './SupabaseClient';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SignIn = ({ onClose, onSignUp, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
const navigate = useNavigate();
const closePopup = () => {
  navigate("/"); 
  window.location.reload();// Redirect to home page without reloading
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Error signing in:', error.message);
        alert('Error signing in: ' + error.message);
      } else {
        console.log('User signed in successfully:', data.user);
        onSuccess();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error: ' + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: 'https://physiophy-v2.vercel.app/update-password',
      });

      if (error) {
        console.error('Error sending reset password email:', error.message);
        alert('Error sending reset password email: ' + error.message);
      } else {
        alert('Reset password email sent successfully. Please check your inbox.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error: ' + error.message);
    }
  };

  return (
    <div className="auth-container" onClick={closePopup}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>
          <X size={24} />
        </button>
        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h1>Welcome Back!</h1>
          <p>Please sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="auth-button">
            <LogIn size={20} />
            <span>Sign In</span>
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button onClick={onSignUp} className="switch-auth">
            <span>Create Account</span>
            <ArrowRight size={16} />
          </button>
          {/* <p className="demo-credentials">
            <strong>Admin demo credentials:</strong>
            <br />
            Email: admin@example.com
            <br />
            Password: admin
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
