import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2, Trash2, Save, X } from 'lucide-react';
import './AdminAppointment.css';
import supabase from './SupabaseClient';

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    date: '',
    time: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Error fetching appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditForm({
      date: appointment.date,
      time: appointment.time
    });
    setIsEditing(true);
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        setLoading(true);
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', id);

        if (error) throw error;
        await fetchAppointments();
        
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = 'Appointment deleted successfully';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (id) => {
    if (!editForm.date || !editForm.time) {
      alert('Please fill in both date and time fields.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('appointments')
        .update({
          date: editForm.date,
          time: editForm.time
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchAppointments();
      setEditingId(null);
      setEditForm({ date: '', time: '' });
      setIsEditing(false);
      
      const toast = document.createElement('div');
      toast.className = 'success-toast';
      toast.textContent = 'Appointment updated successfully';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error updating appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone.includes(searchTerm)
  );

  if (loading && appointments.length === 0) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading appointments...</p>
    </div>;
  }

  return (
    <div className="admin-appointments">
      <div className="header">
        <h1>Appointment Management</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Problem</th>
              <th>Date</th>
              <th>Time</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.phone}</td>
                <td>
                  <div className="problem-cell">
                    {appointment.problem}
                  </div>
                </td>
                <td>
                  {editingId === appointment.id ? (
                    <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                  ) : appointment.date}
                </td>
                <td>
                  {editingId === appointment.id ? (
                    <input type="time" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} />
                  ) : appointment.time}
                </td>
                <td>{new Date(appointment.created_at).toLocaleString()}</td>
                <td>
                  {editingId === appointment.id ? (
                    <>
                      <button onClick={() => handleSave(appointment.id)} disabled={loading}><Save size={16} /> Save</button>
                      <button onClick={() => handleCancel(appointment.id)} disabled={loading}><X size={16} /> Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(appointment)} disabled={loading || isEditing}><Edit2 size={16} /> Edit</button>
                      <button onClick={() => handleCancel(appointment.id)} disabled={loading || isEditing}><Trash2 size={16} /> Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointment;