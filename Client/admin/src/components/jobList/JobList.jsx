import React, { useEffect, useState } from "react";
import JobDetailModal from "../jobDetailModal/JobDetailModal";
import "./jobList.scss";
import fetchJobs from "../../utils/fetchJobs";
import handleDeleteJob from "../../utils/handleDeleteJob";
import handleRetryJob from "../../utils/handleRetryJob";
import Pagination from "../pagination/Pagination";
import JobCard from "../jobCard/JobCard";
import { useSearchParams } from "react-router-dom";

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

  const handleJobClick = (job) => {
    console.log(job);
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
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
    await handleRetryJob(jobId);
    refreshJobs();
  };

  const handleDelete = async (jobId) => {
    await handleDeleteJob(jobId);
    if (jobs.length === 1 && currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
      setCurrentPage(currentPage - 1);
    }
    await refreshJobs();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-list-container">
      <h2>Job Listings</h2>
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
