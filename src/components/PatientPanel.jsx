import { useEffect, useState } from "react";
import supabase from "./SupabaseClient";
import './PatientPanel.css';  // Import the CSS file

const PatientPanel = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !session.user) {
        console.error("User session not found");
        setLoading(false);
        return;
      }
  
      const userId = session.user.id;
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", userId)
        .single();
  
      if (error) {
        console.error("Error fetching patient data:", error);
      } else {
        setPatientData(data);
      }
    } catch (error) {
      console.error("Unexpected error fetching patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-panel">
      <h2>Patient Dashboard</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : patientData ? (
        <div>
          <p>Sessions Left: {patientData.sessions_left}</p>
          <p>Improvements: {patientData.improvements}</p>
          <p>Exercise Plan: {patientData.exercise_plan}</p>
        </div>
      ) : (
        <p className="no-data">No patient data found</p>
      )}
    </div>
  );
};

export default PatientPanel;