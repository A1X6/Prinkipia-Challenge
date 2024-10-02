import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleRetryJob = async (jobId) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.post(
      `${backendUrl}/api/admin/jobs/${jobId}/retry`,
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
