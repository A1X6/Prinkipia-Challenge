import React, { useState, useEffect } from "react";
import "./jobDetailModal.scss";
import fetchJobById from "../../utils/fetchJobById";

const JobDetailModal = ({ job_, onClose, onRetry, onDelete }) => {
  const [job, setJob] = useState({
    _id: "Loading...",
    name: "Loading...",
    status: "Loading...",
    createdBy: "Loading...",
    details: "Loading...",
    retryCount: "Loading...",
    errorMessage: "Loading...",
    createdAt: "Loading...",
    updatedAt: "Loading...",
  });

  // Use useEffect to handle setting the job state
  useEffect(() => {
    if (!job_) {
      setJob({
        _id: "Job Not Found",
        name: "Job Not Found",
        status: "Job Not Found",
        createdBy: "Job Not Found",
        details: "Job Not Found.",
        retryCount: "Job Not Found",
        errorMessage: "Job Not Found",
        createdAt: "Job Not Found",
        updatedAt: "Job Not Found",
      });
    } else {
      setJob(job_);
    }
  }, [job_]); // This will only run when job_ changes

  const isRetryDisabled = job.status !== "FAILED" || job.status === "NOT_FOUND";
  const isDeleteDisabled =
    (job.status !== "FAILED" && job.status !== "QUEUED") ||
    job.status === "NOT_FOUND";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="job-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Job Details</h2>
        <div className="job-detail-info">
          <p>
            <strong>ID:</strong> {job._id}
          </p>
          <p>
            <strong>Name:</strong> {job.name}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`job-status ${job.status.toLowerCase()}`}>
              {job.status}
            </span>
          </p>
          <p>
            <strong>Created By:</strong> {job.createdBy}
          </p>
          <p>
            <strong>Details:</strong> {job.details}
          </p>
          <p>
            <strong>Retry Count:</strong> {job.retryCount}
          </p>
          <p>
            <strong>Error Message:</strong> {job.errorMessage || "No errors"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(job.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="job-detail-actions">
          <button onClick={onClose}>Close</button>
          <button
            onClick={async () => {
              await onRetry();
              const updatedJob = await fetchJobById(job._id);
              setJob(updatedJob);
            }}
            disabled={isRetryDisabled}
          >
            Retry
          </button>
          <button
            onClick={async () => {
              await onDelete();
              onClose();
            }}
            disabled={isDeleteDisabled}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
