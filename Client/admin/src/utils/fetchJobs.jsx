import axios from "axios";

const fetchJobs = async (page = 1) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`http://localhost:5000/api/admin/jobs?page=${page}`, {
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
