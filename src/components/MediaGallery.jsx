import React, { useState, useEffect } from 'react';
import { Play, Image, Video, X, Loader2 } from 'lucide-react';
import { Link } from "react-router-dom";
import './MediaGallery.css';
import supabase from './SupabaseClient';

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, age, photo_url, video_url, problem, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaItems(data);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to load media items');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const filteredItems = mediaItems.filter(item => {
    if (filter === 'photos') return !item.video_url;
    if (filter === 'videos') return item.video_url;
    return true;
  });

  if (loading) {
    return (
      <div className="media-loading">
        <Loader2 className="spinner" size={40} />
        <p>Loading your gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="media-error">
        <p>{error}</p>
        <button onClick={fetchMediaItems} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="media-gallery">
      <header className="gallery-header">
        <h1>Patient Gallery</h1>
        <p>Browse our collection of success stories and transformations</p>
      </header>

      <nav className="gallery-nav">
        <button 
          className={`nav-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <Image size={20} />
          <span>Testimonials</span>
        </button>
        <Link 
          to="/ClinicsPhotos"
          className={`nav-button ${filter === 'photos' ? 'active' : ''}`}
        >
          <Image size={20} />
          <span>Clinic Photos</span>
        </Link>
        <Link 
          to="/ClinicVideos"
          className={`nav-button ${filter === 'videos' ? 'active' : ''}`}
        >
          <Video size={20} />
          <span>Clinic Videos</span>
        </Link>
      </nav>

      <div className="media-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="media-card"
            onClick={() => openModal(item)}
          >
            <div className="media-content">
              <img 
                src={item.photo_url} 
                alt={`${item.name}'s transformation`}
                className="media-image"
                loading="lazy"
              />
              {item.video_url && (
                <div className="video-badge">
                  <Play size={20} />
                </div>
              )}
              <div className="media-overlay">
                <div className="overlay-content">
                  <h3>{item.name}, {item.age}</h3>
                  <p>{item.problem.substring(0, 100)}...</p>
                  <span className="view-button">
                    {item.video_url ? 'Watch Video' : 'View Details'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-media">
              {selectedItem.video_url ? (
                <video 
                  controls 
                  className="modal-video"
                  autoPlay
                >
                  <source src={selectedItem.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={selectedItem.photo_url} 
                  alt={`${selectedItem.name}'s transformation`}
                  className="modal-image"
                />
              )}
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedItem.name}</h2>
                <span className="modal-age">{selectedItem.age} years old</span>
              </div>
              <p className="modal-description">{selectedItem.problem}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;