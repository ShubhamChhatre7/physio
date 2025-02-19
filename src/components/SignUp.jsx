import React, { useState } from "react";
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, X } from "lucide-react";
import "./Auth.css";
import Logo from "./Logo.png";
import  supabase  from "./SupabaseClient";

const SignUp = ({ onClose, onSignIn, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
  
    setLoading(true);
  
    try {
      // Sign up the user using Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) {
        console.error("Error signing up:", error.message);
        alert("Error signing up: " + error.message);
        setLoading(false);
        return;
      }
  
      const user = data.user;
  
      if (user) {
        // Insert user data into the users table
        const { data: userData, error: userError } = await supabase
  .from('users')
  .upsert([
    {
      id: user.id, // Use the auth user ID
      email: formData.email,
      full_name: formData.fullName,
      phone: formData.phone, // Include other fields as necessary
      role: 'patient', // Default role is patient
    },
  ]);

if (userError) {
  console.error('Error inserting into users table:', userError.message);
  alert('Error creating user profile: ' + userError.message);
  setLoading(false);
  return;
}
  
        // Insert an entry in the patients table for tracking progress
        const { error: patientError } = await supabase.from("patients").insert([{
          user_id: user.id, // Link patient to the user
          sessions_left: 10, // Default number of sessions
          exercise_plan: "Initial assessment pending", // Placeholder text
          improvements: "No data yet", // Placeholder text
        }]);
  
        if (patientError) {
          console.error("Error inserting into patients table:", patientError.message);
          alert("Error creating patient profile: " + patientError.message);
          setLoading(false);
          return;
        }
  
        console.log("User signed up successfully:", user);
        alert("Account created successfully! Please check your email to verify your account.");
        onSuccess();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h1>Create Account</h1>
          <p>Join us to start your healing journey</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <User size={20} className="input-icon" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
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
              <Phone size={20} className="input-icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
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
          <div className="form-group">
            <label>
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <span>I agree to the Terms & Conditions</span>
            </label>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating..." : <><UserPlus size={20} /> <span>Create Account</span></>}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account?</p>
          <button onClick={onSignIn} className="switch-auth">
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
