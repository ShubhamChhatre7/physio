import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import supabase from './SupabaseClient';
import './ClinicVideos.css';

const VideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
          videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="video-card">
      <div className="video-wrapper">
        <video 
          ref={videoRef}
          src={video.video_url} 
          poster={video.photo_url}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="video-controls">
          <div className="control-overlay">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={toggleMute}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
            <button onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize /> : <Maximize />}
            </button>
          </div>
        </div>
      </div>
      <div className="video-info">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </div>
  );
};

const ClinicVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .not('video_url', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data);
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
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading videos: {error}</p>
      </div>
    );
  }

  return (
    <div className="clinic-videos">
      <header className="gallery-header">
        <h1>Our Video Gallery</h1>
      </header>
      
      {videos.length === 0 ? (
        <div className="no-videos">
          <p>No videos available at the moment.</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map(video => (
            <VideoPlayer key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicVideos;