import React, { useState, useEffect } from 'react';
import { Pencil, Trash, PlusCircle, Loader2, Upload } from 'lucide-react';
import supabase from './SupabaseClient';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: '',
    experience: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      setDoctors(data);
    } catch (error) {
      setError('Error fetching doctors: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('doctor-photos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imagePath = null;
      if (formData.image) {
        imagePath = await uploadImage(formData.image);
      }

      const doctorData = {
        name: formData.name,
        role: formData.role,
        specialization: formData.specialization,
        experience: parseInt(formData.experience),
        ...(imagePath && { image: imagePath })
      };

      if (editingId) {
        await supabase.from('doctors').update(doctorData).eq('id', editingId);
      } else {
        await supabase.from('doctors').insert([doctorData]);
      }

      setFormData({ name: '', role: '', specialization: '', experience: '', image: null });
      setEditingId(null);
      fetchDoctors();
    } catch (error) {
      setError('Error saving doctor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingId(doctor.id);
    setFormData({
      name: doctor.name,
      role: doctor.role,
      specialization: doctor.specialization,
      experience: doctor.experience,
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await supabase.from('doctors').delete().eq('id', id);
      fetchDoctors();
    } catch (error) {
      setError('Error deleting doctor: ' + error.message);
    }
  };

  const getImageUrl = (imagePath) => {
    return `https://zlmsmdibvnnhxthvdhhf.supabase.co/storage/v1/object/public/doctor-photos/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={40} />
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="doctors-admin">
      <div className="form-container">
        <h2>{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
        <form onSubmit={handleSubmit} className="doctors-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Experience (years)</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <div 
              className={`file-upload-container ${isDragging ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="upload-icon" size={32} />
              <p className="upload-text">Drag & drop or click to upload</p>
              <p className="upload-support">Supports: JPG, PNG, GIF</p>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : (editingId ? 'Update Doctor' : 'Add Doctor')}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="doctors-list">
        <h2>Doctors List</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              {doctor.image && (
                <img
                  src={getImageUrl(doctor.image)}
                  alt={doctor.name}
                  className="doctor-image"
                  onError={(e) => e.target.src = '/fallback-image.jpg'}
                />
              )}
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-role">{doctor.role}</p>
                <p className="doctor-specialization">{doctor.specialization}</p>
                <p className="doctor-experience">{doctor.experience} years experience</p>
              </div>
              <div className="doctor-actions">
                <button className="edit-btn" onClick={() => handleEdit(doctor)}>
                  <Pencil size={16} /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(doctor.id)}>
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;