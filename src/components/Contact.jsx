import React, { useState } from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-main">
    <div className="contact-container">
      <div className="contact-header">
        <h1>Your First Step to a Healthier, Pain-Free Life</h1>
        <div className="decorative-line"></div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Contact us for any inquiries, appointments, or further information. We're here to help you.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <MapPin className="icon" />
              <span>123 Wellness Avenue, Greenfield</span>
            </div>
            <div className="contact-item">
              <Mail className="icon" />
              <span>contact@physiotherapy.com</span>
            </div>
            <div className="contact-item">
              <Phone className="icon" />
              <span>+1-234-567-890</span>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow us on:</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><Facebook /></a>
              <a href="#" className="social-icon"><Twitter /></a>
              <a href="#" className="social-icon"><Instagram /></a>
              <a href="#" className="social-icon"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;