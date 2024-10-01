import axios from "axios";

const handleDeleteJob = async (jobId) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`http://localhost:5000/api/admin/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

export default handleDeleteJob;
