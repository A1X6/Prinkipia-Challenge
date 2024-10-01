import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const fetchJobById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${backendUrl}/api/admin/jobs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export default fetchJobById;
