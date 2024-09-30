const axios = require("axios");
const jobs = require("../data/jobs");

const loginUrl = "http://localhost:5000/api/auth/login";
const jobsUrl = "http://localhost:5000/api/admin/jobs";

const credentials = {
  email: "admin@example.com",
  password: "password-admin",
};

async function login() {
  try {
    const response = await axios.post(loginUrl, credentials);
    const token = response.data.token;
    console.log("Login successful. Token:", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    throw error;
  }
}

async function postJob(job, token) {
  try {
    const response = await axios.post(jobsUrl, job, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`job ${job.name} posted:`, response.data);
  } catch (error) {
    console.error("Failed to post job:", job.name, error.response.data);
  }
}

async function main() {
  try {
    const token = await login();
    for (const job of jobs) {
      await postJob(job, token);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
