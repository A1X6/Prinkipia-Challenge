import React, { useEffect, useState } from "react";
import JobDetailModal from "../jobDetailModal/JobDetailModal";
import "./jobList.css";
import fetchJobs from "../../utils/fetchJobs";
import fetchJobById from "../../utils/fetchJobById";
import handleDeleteJob from "../../utils/handleDeleteJob";
import handleRetryJob from "../../utils/handleRetryJob";
import Pagination from "../pagination/Pagination";
import JobCard from "../jobCard/JobCard";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";
import ConfirmationMenuDelete from "../confirmationMenuDelete/ConfirmationMenuDelete";
import ConfirmationMenuRetry from "../confirmationMenuRetry/ConfirmationMenuRetry";

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
  const [confirmationRetry, setConfirmationRetry] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false);
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
    const fetchJob = async () => {
      const id = searchParams.get("id");
      if (id) {
        const job = await fetchJobById(id);
        setSelectedJob(job);
        setModalVisible(true);
      }
    };

    fetchData();
    fetchJob();
  }, [currentPage]);

  const handleCreateJob = () => {
    navigate("/jobs/create");
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
    setSearchParams({ id: job._id });
  };

  const handleOnRetryClick = (job) => {
    setSelectedJob(job);
    setConfirmationRetry(true);
  };

  const handleOnDeleteClick = (job) => {
    setSelectedJob(job);
    setConfirmationDelete(true);
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
    setConfirmationRetry(false);  
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
    setConfirmationDelete(false);  
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
            onRetry={() => handleOnRetryClick(job)}
            onDelete={() => handleOnDeleteClick(job)}
          />
        ))}
      </div>
      <Alert message={alertMessage} status={alertStatus} />

      {modalVisible && (
        <JobDetailModal
          job_={selectedJob}
          onClose={closeModal}
          onRetry={() => handleRetry(selectedJob._id)}
          onDelete={() => handleDelete(selectedJob._id)}
        />
      )}

      {confirmationRetry && (
        <ConfirmationMenuRetry
          onYes={() => handleRetry(selectedJob._id)}
          onNo={() => setConfirmationRetry(false)}
        />
      )}

      {confirmationDelete && (
        <ConfirmationMenuDelete
          onYes={() => handleDelete(selectedJob._id)}
          onNo={() => setConfirmationDelete(false)}
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
