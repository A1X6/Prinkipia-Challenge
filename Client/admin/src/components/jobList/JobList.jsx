import React, { useEffect, useState } from "react";
import JobDetailModal from "../jobDetailModal/JobDetailModal";
import "./jobList.scss";
import fetchJobs from "../../utils/fetchJobs";
import handleDeleteJob from "../../utils/handleDeleteJob";
import handleRetryJob from "../../utils/handleRetryJob";
import Pagination from "../pagination/Pagination";
import JobCard from "../jobCard/JobCard";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const SearchPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(SearchPage);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchJobs(currentPage);
      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const handleCreateJob = () => {
    navigate("/jobs/create");
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
    setSearchParams({ id: job._id });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
    setSearchParams();
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
      setCurrentPage(currentPage - 1);
    }
  };

  const refreshJobs = async () => {
    const data = await fetchJobs(currentPage);
    setJobs(data.jobs);
    setTotalJobs(data.totalJobs);
    setTotalPages(data.totalPages);
  };

  const handleRetry = async (jobId) => {
    try {
      await handleRetryJob(jobId);
      setAlertMessage("Job retried successfully.");
      setAlertStatus("success");
    } catch (error) {
      setAlertMessage("Failed to retry the job.");
      setAlertStatus("error");
    }
    refreshJobs();

    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleDelete = async (jobId) => {
    try {
      await handleDeleteJob(jobId);
      if (jobs.length === 1 && currentPage > 1) {
        setSearchParams({ page: currentPage - 1 });
        setCurrentPage(currentPage - 1);
      }
      setAlertMessage("Job deleted successfully.");
      setAlertStatus("success");
    } catch (error) {
      setAlertMessage("Failed to delete the job.");
      setAlertStatus("error");
    }
    await refreshJobs();

    setTimeout(() => setAlertMessage(""), 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-list-container">
      <h2>Job Listings</h2>
      <div className="create-job">
        <span className="create-job-text">Create New Job:</span>
        <button className="create-job-btn" onClick={handleCreateJob}>
          Create
        </button>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onJobClick={handleJobClick}
            onRetry={() => handleRetry(job._id)}
            onDelete={() => handleDelete(job._id)}
          />
        ))}
      </div>
      <Alert message={alertMessage} status={alertStatus} />
      {modalVisible && (
        <JobDetailModal
          job_={selectedJob}
          onClose={closeModal}
          onDelete={() => handleDelete(selectedJob._id)}
          onRetry={() => handleRetry(selectedJob._id)}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        totalJobs={totalJobs}
      />
    </div>
  );
};

export default JobList;
