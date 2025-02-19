import React from "react";
import "./AdminInstructions.css";

const AdminInstructions = () => {
  return (
    <div className="admin-instructions-container">
      <h1 className="admin-instructions-title">Admin Panel Guide</h1>
      
      <section className="admin-section">
        <h2>1. Manage Appointments</h2>
        <ul>
          <li><strong>View:</strong> See all appointments in a table.</li>
          <li><strong>Search:</strong> Find appointments by name, email, or phone.</li>
          <li><strong>Edit:</strong> Click <strong>Edit</strong>, change date/time, then <strong>Save</strong>.</li>
          <li><strong>Delete:</strong> Click <strong>Delete</strong> and confirm.</li>
        </ul>
      </section>
      
      <section className="admin-section">
        <h2>2. Manage Patients</h2>
        <ul>
          <li><strong>View:</strong> See patient details.</li>
          <li><strong>Edit:</strong> Click on a patient, update info, then <strong>Save</strong>.</li>
        </ul>
      </section>
      
      <section className="admin-section">
        <h2>3. Manage Doctors</h2>
        <ul>
          <li><strong>View:</strong> See the list of doctors.</li>
          <li><strong>Add:</strong> Fill in details, upload a photo, and click <strong>Add</strong>.</li>
          <li><strong>Edit:</strong> Click <strong>Edit</strong>, update info, then <strong>Save</strong>.</li>
          <li><strong>Delete:</strong> Click <strong>Delete</strong> and confirm.</li>
        </ul>
      </section>
      
      <section className="admin-section">
        <h2>4. Upload Media</h2>
        <ul>
          <li><strong>Upload:</strong> Choose <strong>Photo</strong> or <strong>Video</strong>, add title & description, then upload.</li>
          <li><strong>Delete:</strong> Click <strong>Delete</strong> and confirm.</li>
        </ul>
      </section>
      
      <section className="admin-section">
        <h2>5. Manage Testimonials</h2>
        <ul>
          <li><strong>View:</strong> See patient testimonials.</li>
          <li><strong>Add:</strong> Fill in details, upload a photo (required) & video (optional), then <strong>Save</strong>.</li>
          <li><strong>Delete:</strong> Click <strong>Delete</strong> and confirm.</li>
        </ul>
      </section>
      
      <section className="admin-section admin-important-notes">
        <h2>Important Notes</h2>
        <ul>
          <li>Changes save automatically when you click <strong>Save</strong> or <strong>Add</strong>.</li>
          <li>Deleted items <strong>cannot</strong> be restored.</li>
          <li>Contact support for technical issues.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminInstructions;