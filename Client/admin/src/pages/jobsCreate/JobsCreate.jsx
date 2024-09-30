import "./jobsCreate.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobsCreate = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this URL with your actual API endpoint for creating jobs
    const apiUrl = "http://localhost:5000/api/admin/jobs";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add your token if needed
        },
        body: JSON.stringify({
          name,
          details,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      // Navigate back to job list after successful creation
      navigate("/jobs"); // Adjust this route to your job list path
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error creating the job. Please try again.");
    }
  };

  return (
    <div className="create-job-form-container">
      <h2>Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Job Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
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
