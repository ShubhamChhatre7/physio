import { useEffect, useState } from "react"
import supabase from "./SupabaseClient"
import "./AdminPanel.css"

const AdminPanel = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      // Get all patient records with their user data
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select(`
          *,
          users:user_id (
            id,
            full_name,
            role
          )
        `)
        .order('created_at', { ascending: false })

      if (patientError) throw patientError

      const validPatients = patientData
        .filter(p => p.users && p.users.role === 'patient')
        .map(p => ({
          id: p.users.id,
          full_name: p.users.full_name,
          sessions_left: p.sessions_left,
          exercise_plan: p.exercise_plan,
          improvements: p.improvements,
          created_at: p.created_at
        }))

      console.log("Valid patients:", validPatients)
      setPatients(validPatients)
      setError(null)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to load patients data")
    } finally {
      setLoading(false)
    }
  }

  const handlePatientSelect = (patient) => {
    console.log("Selected patient:", patient)
    setSelectedPatient(patient)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    try {
      console.log("Attempting to update patient:", selectedPatient)

      // First check if the user still exists
      const { data: userExists, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', selectedPatient.id)
        .eq('role', 'patient')
        .single()

      if (userError || !userExists) {
        throw new Error("This patient's user account is no longer active")
      }

      const updateData = {
        user_id: selectedPatient.id,
        sessions_left: parseInt(selectedPatient.sessions_left) || 0,
        exercise_plan: selectedPatient.exercise_plan || "",
        improvements: selectedPatient.improvements || ""
      }

      console.log("Update data:", updateData)

      // First check if a record exists
      const { data: existingRecord, error: checkError } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', selectedPatient.id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine
        throw checkError
      }

      let updateError
      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('patients')
          .update(updateData)
          .eq('user_id', selectedPatient.id)
        updateError = error
      } else {
        // Insert new record
        const { error } = await supabase
          .from('patients')
          .insert([updateData])
        updateError = error
      }

      if (updateError) {
        console.error("Update error:", updateError)
        throw new Error("Failed to update patient record")
      }

      alert("Patient details updated successfully.")
      setSelectedPatient(null)
      fetchPatients()
    } catch (err) {
      console.error("Error in handleUpdate:", err)
      alert(`Error updating patient details: ${err.message}`)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>Admin Panel</h2>
      </div>

      {loading ? (
        <p className="loading">Loading patients data...</p>
      ) : (
        <div className="admin-panel-content">
          <div className="patients-list">
            <h3>Patients List ({patients.length})</h3>
            {patients.length === 0 ? (
              <p>No active patients found</p>
            ) : (
              <ul>
                {patients.map((patient) => (
                  <li key={patient.id} className="patient-item">
                    <div className="patient-info">
                      <span>{patient.full_name}</span>
                      {/* <small>Sessions left: {patient.sessions_left || 0}</small> */}
                    </div>
                    <button onClick={() => handlePatientSelect(patient)}>Edit</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedPatient && (
            <div className="edit-patient-form">
              <h3>Edit Patient Details</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }}>
                <label>
                  Patient Name:
                  <input type="text" value={selectedPatient.full_name} readOnly />
                </label>
                <label>
                  Sessions Left:
                  <input
                    type="number"
                    name="sessions_left"
                    value={selectedPatient.sessions_left || 0}
                    onChange={handleChange}
                    min="0"
                  />
                </label>
                <label>
                  Exercise Plan:
                  <input
                    type="text"
                    name="exercise_plan"
                    value={selectedPatient.exercise_plan || ""}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Improvements:
                  <input
                    type="text"
                    name="improvements"
                    value={selectedPatient.improvements || ""}
                    onChange={handleChange}
                  />
                </label>
                <div className="form-buttons">
                  <button type="submit">Update Patient</button>
                  <button type="button" onClick={() => setSelectedPatient(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPanel