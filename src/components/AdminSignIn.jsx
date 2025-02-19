import React, { useState } from "react";
import { Mail, Lock, LogIn, X } from "lucide-react";
import { Navigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Auth.css";
import Logo from "./Logo.png";
import supabase from "./SupabaseClient";
import { useNavigate } from "react-router-dom";

const AdminSignIn = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
const closePopup = () => {
  navigate("/"); 
  window.location.reload();// Redirect to home page without reloading
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fetch the user from admin_auth table
      const { data: user, error: fetchError } = await supabase
        .from("admin_auth")
        .select("password, role")
        .eq("email", formData.email)
        .single();

      if (fetchError || !user) {
        setError("User not found or incorrect email.");
        return;
      }

      // Compare entered password with hashed password
      const isPasswordValid = await bcrypt.compare(formData.password, user.password);
      if (!isPasswordValid) {
        setError("Invalid password.");
        return;
      }

      // Ensure user has admin role
      if (user.role !== "admin") {
        setError("Access denied: Only admins can log in.");
        return;
      }

      // Successfully authenticated
      // Store admin email in localStorage
      localStorage.setItem("admin_email", formData.email);

      setIsAuthenticated(true);
      console.log("Admin signed in successfully.");

    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to admin dashboard if authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return (
    <div className="auth-container" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>
          <X size={24} />
        </button>
        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h1>Admin Sign In</h1>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
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
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing In..." : <><LogIn size={20} /> <span>Sign In</span></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
