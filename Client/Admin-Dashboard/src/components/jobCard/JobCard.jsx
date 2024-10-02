import "./jobCard.css";

const JobCard = ({ job, onJobClick, onRetry, onDelete }) => {
  return (
    <div className="job-card">
      <div className="job-info" onClick={() => onJobClick(job)}>
        <h3>{job.name}</h3>
        <p className={`job-status ${job.status.toLowerCase()}`}>{job.status}</p>
      </div>
      <div className="job-actions">
        <button onClick={() => onJobClick(job)}>Details</button>

        <button onClick={onRetry} disabled={job.status !== "FAILED"}>
          Retry
        </button>

        <button
          onClick={onDelete}
          disabled={job.status !== "QUEUED" && job.status !== "FAILED"}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
