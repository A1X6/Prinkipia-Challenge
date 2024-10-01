import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleDeleteJob = async (jobId) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`${backendUrl}/api/admin/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

export default handleDeleteJob;
