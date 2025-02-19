import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './SupabaseClient';
import './UpdatePassword.css'; // Import CSS

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error('Error updating password:', error.message);
      alert('Error updating password: ' + error.message);
    } else {
      alert('Password updated successfully! Please sign in again.');
      await supabase.auth.signOut(); // Log the user out
      navigate('/signin'); // Redirect to the sign-in page
    }
  };

  return (
    <div className="update-password-container">
      <div className="update-password-card">
        <h1>Update Password</h1>
        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
