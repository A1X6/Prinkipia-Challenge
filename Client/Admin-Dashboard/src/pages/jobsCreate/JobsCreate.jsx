import React, { useState } from "react";
import "./jobsCreate.css";
import { useNavigate } from "react-router-dom";
import handleCreateJob from "../../utils/handleCreateJob";
import Alert from "../../components/alert/Alert";

const JobsCreate = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleCreateJob({ name, details });
      if (response.status !== 201) {
        throw new Error("Failed to create job");
      }
      setAlertMessage("Job created successfully.");
      setAlertStatus("success");
      setTimeout(() => {
        setAlertMessage("");
        navigate("/jobs");
      }, 3000);
    } catch (error) {
      setAlertMessage("Failed to created the job.");
      setAlertStatus("error");
      setTimeout(() => setAlertMessage(""), 3000);
      console.error("Error:", error);
    }
  };

  return (
    <div className="create-job-form-container">
      <Alert message={alertMessage} status={alertStatus} />
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Job Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="details">Job Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobsCreate;
