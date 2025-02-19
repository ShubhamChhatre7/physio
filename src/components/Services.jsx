import React, { useState, useEffect } from 'react';
import { Activity, Heart, Brain, Users, Stethoscope, Armchair as Wheelchair } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import './Services.css';

const services = [
  {
    icon: <Stethoscope className="rehab-service-icon" />,
    title: "Pediatric Rehabilitation",
    description: "Specialized therapeutic care for children with developmental, neurological, and orthopedic conditions. Our child-friendly approach ensures comfortable and effective treatment.",
    category: "Pediatric Care"
  },
  {
    icon: <Wheelchair className="rehab-service-icon" />,
    title: "Adult Rehabilitation",
    description: "Comprehensive rehabilitation services for adults recovering from injuries, surgeries, or managing chronic conditions. Personalized care plans for optimal recovery.",
    category: "Adult Care"
  },
  {
    icon: <Activity className="rehab-service-icon" />,
    title: "Manual Therapy",
    description: "Hands-on techniques to reduce pain, decrease muscle tension and improve mobility through skilled manipulation of soft tissues and joints.",
    category: "Pain Management"
  },
  {
    icon: <Heart className="rehab-service-icon" />,
    title: "Rehabilitation Exercises",
    description: "Customized exercise programs designed to restore strength, flexibility, and function following injury or surgery.",
    category: "Recovery"
  },
  {
    icon: <Brain className="rehab-service-icon" />,
    title: "Neurological Rehabilitation",
    description: "Expert treatment for conditions affecting the nervous system, including stroke recovery and balance disorders.",
    category: "Specialized Care"
  },
  {
    icon: <Users className="rehab-service-icon" />,
    title: "Group Exercise Classes",
    description: "Therapeutic exercise sessions in a supportive group setting, perfect for maintaining long-term health and wellness.",
    category: "Wellness"
  }
];

const ServiceCard = ({ icon, title, description, category }) => {
  return (
    <div className="rehab-service-card rehab-fade-in">
      <div className="rehab-service-icon-wrapper rehab-pulse">
        {icon}
      </div>
      <div className="rehab-service-category">
        <span>{category}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Services = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating authentication state

  useEffect(() => {
    const cards = document.querySelectorAll('.rehab-service-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rehab-visible');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      // Proceed with booking logic
      console.log("Proceed to booking");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="rehab-services-page">
      <div className="rehab-hero" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
      }}>
        <div className="rehab-hero-overlay">
          <div className="rehab-hero-content">
            <div className="rehab-hero-text rehab-slide-in">
              <h1>Comprehensive Rehabilitation Services</h1>
              <p>Expert care for all ages and conditions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rehab-main-content">
        <div className="rehab-intro-section rehab-fade-in">
          <h2>Our Specialized Services</h2>
          <p>
            From pediatric care to adult rehabilitation, we provide comprehensive therapeutic solutions
            tailored to each patient's unique needs and goals.
          </p>
        </div>

        <div className="rehab-services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="rehab-cta-section">
          <div className="rehab-cta-content rehab-bounce-in">
            <h3>Begin Your Recovery Journey Today</h3>
            <p>
              Let our experienced team guide you through your rehabilitation process.
            </p>
            <button onClick={handleBookAppointment} className="rehab-cta-button">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Sign In Required</h2>
            <p>You need to sign in to book an appointment.</p>
            <div className="button-group">
              <RouterLink to="signIn" className="login-btn">Sign In</RouterLink>
              <button onClick={closePopup} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
