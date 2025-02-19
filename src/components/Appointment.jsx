import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import './Appointment.css';
import supabase from './SupabaseClient';

const Appointment = () => {
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problem: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return alert('Please select date and time.');

    try {
      const { error } = await supabase.from('appointments').insert([
        { ...formData, date: selectedDate, time: selectedTime }
      ]);

      if (error) throw error;
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  };

  return (
    <div className="appointment-page">
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Book Your Physiotherapy Session</h1>
        <div className="decorative-line"></div>
        <p>Take the first step towards recovery with our expert physiotherapists</p>
      </div>

      {!showConfirmation ? (
        <div className="appointment-content">
          <div className="booking-section">
            <h2>
              <Calendar className="section-icon" />
              Select Date & Time
            </h2>
            
            <div className="date-selection">
              {getAvailableDates().map(({ date, display }) => (
                <button
                  key={date}
                  className={`date-button ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {display}
                </button>
              ))}
            </div>

            {selectedDate && (
              <div className="time-selection">
                <h3>
                  <Clock className="section-icon" />
                  Available Time Slots
                </h3>
                <div className="time-slots">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedDate && selectedTime && (
            <div className="details-section">
              <h2>
                <User className="section-icon" />
                Your Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <User className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <Phone className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <FileText className="input-icon" />
                    <textarea
                      name="problem"
                      placeholder="Please describe your condition or reason for visit"
                      value={formData.problem}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="submit-button">
                  Confirm Booking
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="confirmation-message">
          <CheckCircle className="confirmation-icon" />
          <h2>Appointment Confirmed!</h2>
          <p>Thank you for booking with us. We've sent a confirmation to your email.</p>
          <div className="appointment-details">
            <p>
              <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
          <button 
            className="new-booking-button"
            onClick={() => {
              setShowConfirmation(false);
              setSelectedDate('');
              setSelectedTime('');
              setFormData({ name: '', email: '', phone: '', problem: '' });
            }}
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Appointment;