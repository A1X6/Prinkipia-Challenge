import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchJobs = async (page = 1) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${backendUrl}/api/admin/jobs?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export default fetchJobs;
