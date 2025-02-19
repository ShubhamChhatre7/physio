import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { User, Mail, Lock, Phone, UserPlus, ArrowRight, X } from "lucide-react";
import "./Auth.css"; // Keeps your original styling
import Logo from "./Logo.png";
import supabase from "./SupabaseClient";
import { useNavigate } from "react-router-dom";

const AdminSignUp = ({ onClose, onSignIn, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
const closePopup = () => {
  navigate("/"); 
  window.location.reload();// Redirect to home page without reloading
};
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
      // Check if admin email already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admin_auth")
        .select("id")
        .eq("email", formData.email)
        .single();

      if (existingAdmin) {
        alert("Email already registered!");
        setLoading(false);
        return;
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Insert new admin into the admin_auth table
      const { data, error } = await supabase.from("admin_auth").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: hashedPassword, // Store hashed password
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      alert("Admin registered successfully!");
      onSuccess();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>
          <X size={24} />
        </button>
        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h1>Create Admin Account</h1>
          <p>Securely manage your admin dashboard</p>
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

export default AdminSignUp;
