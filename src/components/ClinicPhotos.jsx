import React, { useState, useEffect } from 'react';
import supabase from './SupabaseClient';
import { Camera } from 'lucide-react';
import './ClinicPhotos.css';

const ClinicPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .not('photo_url', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading photos: {error}</p>
      </div>
    );
  }

  return (
    <div className="clinic-photos">
      <header className="gallery-header">
        <Camera size={32} />
        <h1>Our Clinic Gallery</h1>
      </header>
      
      {photos.length === 0 ? (
        <div className="no-photos">
          <p>No photos available at the moment.</p>
        </div>
      ) : (
        <ul className="gallery">
          {photos.map((photo) => (
            <li key={photo.id} className="image-container">
              <img 
                className="gallery-image" 
                src={photo.photo_url} 
                alt={photo.title || 'Gallery image'} 
              />
              {(photo.title || photo.description) && (
                <figcaption className="overlay">
                  {photo.title && <h3>{photo.title}</h3>}
                  {photo.description && <p>{photo.description}</p>}
                </figcaption>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicPhotos;