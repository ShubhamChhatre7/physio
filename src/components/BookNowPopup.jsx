import React, { useState } from "react";
import "./Popup.css"; // Import the CSS file

const BookNowPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleBookNow = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {/* Book Now Button */}
      <button onClick={handleBookNow} className="book-now-button">
        Book Now
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Appointment Booked!</h2>
            <p>Your appointment request has been received.</p>
            <button onClick={closePopup} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNowPopup;
