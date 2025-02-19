import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="physio-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Physiophy</h3>
          <p className="footer-text">
            We are dedicated to providing expert physiotherapy care with a personalized approach to help you achieve optimal health and wellness.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/book">Book Now</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <i className="footer-icon location"></i>
              123 Wellness Avenue, Greenfield
            </li>
            <li>
              <i className="footer-icon phone"></i>
              +1-234-567-890
            </li>
            <li>
              <i className="footer-icon email"></i>
              contact@physiotherapy.com
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook"></a>
            <a href="https://twitter.com" className="social-icon twitter" aria-label="Twitter"></a>
            <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram"></a>
            <a href="https://linkedin.com" className="social-icon linkedin" aria-label="LinkedIn"></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Physiophy. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;