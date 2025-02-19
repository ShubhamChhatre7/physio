import React, { useState, useEffect } from 'react';
import { Trash2, Upload, User, Calendar, MessageSquare } from 'lucide-react';
import './Testimonials.css';
import supabase from './SupabaseClient';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    age: '',
    problem: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to load testimonials');
    }
  };

  const handleDelete = async (testimonialId, photoUrl, videoUrl) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    setDeleteLoading(testimonialId);
    try {
      const { error: deleteError } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialId);

      if (deleteError) throw deleteError;

      if (photoUrl) {
        const photoPath = photoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`photos/${photoPath}`]);
      }

      if (videoUrl) {
        const videoPath = videoUrl.split('/').pop();
        await supabase.storage
          .from('media')
          .remove([`videos/${videoPath}`]);
      }

      setTestimonials(testimonials.filter(t => t.id !== testimonialId));

    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setError('Failed to delete testimonial');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'photo') setPhotoFile(files[0]);
    if (name === 'video') setVideoFile(files[0]);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error(`Error uploading ${folder}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const [photoUrl, videoUrl] = await Promise.all([
        uploadFile(photoFile, 'photos'),
        videoFile ? uploadFile(videoFile, 'videos') : Promise.resolve(null)
      ]);

      if (!photoUrl) throw new Error('Photo upload failed');

      const { data, error: insertError } = await supabase
        .from('testimonials')
        .insert([{
          ...newTestimonial,
          photo_url: photoUrl,
          video_url: videoUrl,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setTestimonials(prev => [data, ...prev]);
      setNewTestimonial({ name: '', age: '', problem: '' });
      setPhotoFile(null);
      setVideoFile(null);
      e.target.reset();

    } catch (error) {
      console.error('Error adding testimonial:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="testimonials">
      <header className="testimonials-header">
        <h1>Patient Testimonials</h1>
        <p>Real stories from real patients</p>
      </header>

      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className={`admin-toggle ${isAdmin ? 'active' : ''}`}
      >
        Admin Mode: {isAdmin ? 'ON' : 'OFF'}
      </button>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError(null)}><Trash2 size={16} /></button>
        </div>
      )}

      <div className="testimonial-form-container">
        <h2>Add New Testimonial</h2>
        <form onSubmit={handleSubmit} className="testimonial-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                <User size={16} />
                <span>Patient's Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter patient's name"
                value={newTestimonial.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Calendar size={16} />
                <span>Patient's Age</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={newTestimonial.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <MessageSquare size={16} />
              <span>Problem Description</span>
            </label>
            <textarea
              name="problem"
              placeholder="Describe the patient's problem and treatment experience"
              value={newTestimonial.problem}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="file-upload">
                <label>Photo *</label>
                <div className="file-drop-zone">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="drop-zone-content">
                    <Upload size={24} />
                    <span>Drop photo or click to upload</span>
                    <span className="file-type">Supports: JPG, PNG, GIF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="file-upload">
                <label>Video (optional)</label>
                <div className="file-drop-zone">
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                  <div className="drop-zone-content">
                    <Upload size={24} />
                    <span>Drop video or click to upload</span>
                    <span className="file-type">Supports: MP4, WebM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Adding Testimonial...' : 'Add Testimonial'}
          </button>
        </form>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            {isAdmin && (
              <button
                onClick={() => handleDelete(testimonial.id, testimonial.photo_url, testimonial.video_url)}
                className="delete-button"
                disabled={deleteLoading === testimonial.id}
                aria-label="Delete testimonial"
              >
                <Trash2 className={deleteLoading === testimonial.id ? 'loading' : ''} size={16} />
              </button>
            )}

            <div className="testimonial-media">
              <img
                src={testimonial.photo_url}
                alt={testimonial.name}
                className="testimonial-photo"
              />
            </div>

            <div className="testimonial-content">
              <div className="testimonial-header">
                <h3>{testimonial.name}</h3>
                <span className="testimonial-age">{testimonial.age} years old</span>
              </div>

              <p className="testimonial-text">{testimonial.problem}</p>

              {testimonial.video_url && (
                <div className="video-container">
                  <video controls className="testimonial-video">
                    <source src={testimonial.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;