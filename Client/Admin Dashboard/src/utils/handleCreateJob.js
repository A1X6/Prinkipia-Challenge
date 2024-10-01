import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleCreateJob = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${backendUrl}/api/admin/jobs`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export default handleCreateJob;
