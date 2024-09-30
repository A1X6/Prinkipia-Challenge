import axios from "axios";

const handleRetryJob = async (jobId) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.post(
      `http://localhost:5000/api/admin/jobs/${jobId}/retry`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error retrying job:", error);
  }
};

export default handleRetryJob;
