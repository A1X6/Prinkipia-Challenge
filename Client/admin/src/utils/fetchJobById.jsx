import axios from "axios";

const fetchJobById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `http://localhost:5000/api/admin/jobs/${id}`,
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
