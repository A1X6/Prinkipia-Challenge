import axios from "axios";

const handleCreateJob = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `http://localhost:5000/api/admin/jobs`,
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
