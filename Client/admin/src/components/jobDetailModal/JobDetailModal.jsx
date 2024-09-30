import React, { useState } from "react";
import "./jobDetailModal.scss";
import fetchJobById from "../../utils/fetchJobById";

const JobDetailModal = ({ job_, onClose, onRetry, onDelete }) => {
  const [job, setJob] = useState(job_);

  const isRetryDisabled = job.status !== "FAILED";
  const isDeleteDisabled = job.status !== "FAILED" && job.status !== "QUEUED";
  if (!job_) return null;
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
