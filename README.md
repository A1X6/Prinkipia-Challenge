# Admin Dashboard

## Table of Contents

1. [High-Level System Design](#high-level-system-design)
   - [Overview](#overview)
   - [System Components](#system-components)
     - [Client (React/Vite)](#client-reactvite)
     - [Server (Express)](#server-express)
   - [System Architecture](#system-architecture)
   - [Security Considerations](#security-considerations)
   - [Scalability](#scalability)
2. [Instructions to Build and Run the Web App Locally](#instructions-to-build-and-run-the-web-app-locally)
   - [Prerequisites](#prerequisites)
   - [Setup Instructions](#setup-instructions)
3. [API Documentation](#api-documentation)
   - [Authentication](#authentication)
     - [Login](#login)
     - [Verify Token](#verify-token)
   - [Jobs](#jobs)
     - [Create Job](#create-job)
     - [Get All Jobs](#get-all-jobs)
     - [Get Job by ID](#get-job-by-id)
     - [Retry Job](#retry-job)
     - [Delete Job](#delete-job)
4. [Assumptions and Shortcuts Made](#assumptions-and-shortcuts-made)
5. [Technical Debt](#technical-debt)
6. [Future Deployment Options](#future-deployment-options)

---

## High-Level System Design

### Overview

The Admin Dashboard project is designed to provide a user-friendly interface for managing jobs within an organization. The architecture is divided into two main components: the client-side application built with React (using Vite) and the server-side application built with Express. These components work together to allow users to create, read, update, and delete job entries, with a focus on responsiveness and efficient data handling.

### System Components

#### Client (React/Vite)

- **Purpose**: The client application serves as the front-end interface for administrators to manage job entries. It is built as a Single Page Application (SPA) to provide a seamless user experience.
- **Key Technologies**:
  - **React**: A JavaScript library for building user interfaces, allowing for reusable components and efficient state management.
  - **Vite**: A build tool that provides a fast development environment, enabling hot module replacement and optimized builds for production.
- **Key Features**:
  - User authentication and authorization for secure access.
  - A dashboard displaying a list of jobs with options to view, create, edit, and delete jobs.
  - Forms for job creation, providing feedback.
  - Real-time updates through API calls to the server, ensuring data consistency.

#### Server (Express)

- **Purpose**: The server application serves as the back-end API, handling requests from the client and managing job data. It provides endpoints for CRUD operations on jobs and handles authentication.
- **Key Technologies**:
  - **Express**: A web application framework for Node.js that simplifies the creation of server-side applications and APIs.
  - **MongoDB**: A NoSQL database used to store job data persistently.
- **Key Features**:
  - RESTful API design, allowing the client to perform CRUD operations on jobs via HTTP requests.
  - Middleware for handling authentication and authorization.
  - Data validation and sanitation to ensure data integrity.
  - Role-based access control to manage permissions for different user types.

### System Architecture

- **Client-Server Interaction**: The client communicates with the server using AJAX requests (typically via Axios or Fetch API) to retrieve or modify job data. The server responds with JSON data, which the client uses to update the UI accordingly.
- **Data Flow**:

  1. User actions in the client (e.g., submitting a form) trigger API calls to the server.
  2. The server processes the request, performs the necessary operations (e.g., querying the database, validating data), and sends back a response.
  3. The client receives the response and updates the UI based on the data received.

- **State Management**: The client uses state management techniques to manage the application state. This ensures that components reflect the latest data without requiring full page reloads.

### Security Considerations

- **Authentication**: The application uses token-based authentication (JWT) to secure API endpoints. The server verifies tokens with each request to ensure that users are authorized to access or modify resources.

- **Data Validation**: server perform input validation to prevent injection attacks and ensure that only valid data is processed.

### Scalability

- **Horizontal Scaling**: The server can be deployed on multiple instances to handle increased traffic, with load balancers distributing incoming requests.

### Conclusion

The Admin Dashboard project is designed with a modular architecture that separates concerns between the client and server. This structure allows for efficient development, testing, and maintenance, making it easier to scale and enhance the application in future iterations. By leveraging modern technologies and best practices, the project aims to provide a robust solution for job management in an administrative context.

---

## Instructions to Build and Run the Web App Locally

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/A1X6/Prinkipia-Challenge.git
   cd Prinkipia-Challenge

   ```

2. **Navigate to the Server Directory**

   ```bash
   cd Server
   ```

3. **Install Server Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   - Create a `.env` file in the server directory with the following variables:
     ```
     MONGO_URI=<your-database-url>
     PORT=<your-port>
     ```

5. **Start the Server**

   ```bash
   npm run dev
   ```

6. **Navigate to the Client Directory**

   ```bash
   cd ../Client/Admin-Dashboard
   ```

7. **Install Client Dependencies**

   ```bash
   npm install
   ```

8. **Set Up Environment Variables**

   - Create a `.env` file in the Admin Dashboard directory with the following variables:
     ```
     VITE_BACKEND_URL=<your-backend-url>
     ```

9. **Start the Client**

   ```bash
   npm run dev
   ```

10. **Access the Application**

- Open your web browser and go to `http://localhost:5173/` for the client.
- The admin email is : admin@example.com
- The admin password is : password-admin

---

## API Documentation

- All routes except Login require a JWT token to be passed in the Authorization header as a Bearer token.

### Authentication

#### Login

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response** (Success):
  ```json
  {
    "message": "Login successful",
    "user": {
      "_id": "66faaaa46adfed93352a5918",
      "name": "Admin",
      "email": "admin@example.com",
      "phone": "01000000000",
      "address": "Earth",
      "role": "admin",
      "createdAt": "2024-09-30T13:41:56.138Z",
      "updatedAt": "2024-09-30T13:41:56.138Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### Verify Token

- **Endpoint**: `POST /api/auth/verify`
- **Response** (Success):
  ```json
  {
    "message": "Token verified successfully",
    "decoded": {
      "id": "66faaaa46adfed93352a5918",
      "email": "admin@example.com",
      "role": "admin",
      "iat": 1727809508,
      "exp": 1727813108
    }
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Invalid or expired token"
  }
  ```

### Jobs

#### Create Job

- **Endpoint**: `POST /api/admin/jobs`
- **Request Body**:
  ```json
  {
    "name": "Job Name",
    "details": "Job Details"
  }
  ```
- **Response** (Success):
  ```json
  {
    "name": "name",
    "status": "QUEUED",
    "createdBy": "66faaaa46adfed93352a5918",
    "details": "details",
    "_id": "66fc4b1f838ae1337ef690a0",
    "createdAt": "2024-10-01T19:18:55.871Z",
    "updatedAt": "2024-10-01T19:18:55.871Z"
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Error creating job",
    "error": "Detailed error message here"
  }
  ```

#### Get All Jobs

- **Query Parameters**:
  - `page` (optional): The page number to retrieve. If not provided, it defaults to page 1.
- **Response** (Success):
  ```json
  {
    "jobs": [
      {
        "_id": "66fc19c583872b39d41c61cf",
        "name": "name",
        "status": "QUEUED",
        "createdBy": "66faaaa46adfed93352a5918",
        "details": "details",
        "retryCount": 0,
        "createdAt": "2024-10-01T15:48:21.266Z",
        "updatedAt": "2024-10-01T15:48:21.266Z"
      },
      ...
    ],
    "currentPage": 1,
    "totalPages": 4,
    "totalJobs": 31
  }
  ```
  - **Response** (Failure):
    ```json
    {
      "message": "Error fetching jobs",
      "error": "Detailed error message here"
    }
    ```

#### Get Job by ID

- **Endpoint**: `GET /api/admin/jobs/:id`
- **Response** (Success):
  ```json
  {
    "_id": "66fc19c583872b39d41c61cf",
    "name": "name",
    "status": "QUEUED",
    "createdBy": "66faaaa46adfed93352a5918",
    "details": "name",
    "retryCount": 0,
    "createdAt": "2024-10-01T15:48:21.266Z",
    "updatedAt": "2024-10-01T15:48:21.266Z"
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Error fetching job",
    "error": "Detailed error message here"
  }
  ```

#### Retry Job

- **Endpoint**: `POST /api/admin/jobs/:id/retry`
- **Response** (Success):
  ```json
  {
    "_id": "66fc19c583872b39d41c61cf",
    "name": "name",
    "status": "QUEUED",
    "createdBy": "66faaaa46adfed93352a5918",
    "details": "name",
    "retryCount": 0,
    "createdAt": "2024-10-01T15:48:21.266Z",
    "updatedAt": "2024-10-01T15:48:21.266Z"
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Error retrying job",
    "error": "Detailed error message here"
  }
  ```

#### Delete Job

- **Endpoint**: `DELETE /api/admin/jobs/:jobId`
- **Response** (Success):
  ```json
  {
    "message": "Job deleted successfully"
  }
  ```
- **Response** (Failure):
  ```json
  {
    "message": "Error deleting job",
    "error": "Detailed error message here"
  }
  ```

---

## Assumptions and Shortcuts Made

1. **Simple User Authentication with JWT**:

   - Assumption: The system will only require simple authentication with JWT for authorization.
   - Shortcut: No role-based access control (RBAC) has been implemented beyond basic admin/user separation.
   - Reasoning: For this iteration, we focused on a minimal yet secure authentication setup. RBAC and more granular permissions can be added as the project scales.

2. **Basic Error Handling**:

   - Assumption: Error messages are sufficient for developers to troubleshoot issues.
   - Shortcut: More detailed error handling and logging (e.g., logging to external services like Sentry) have not been implemented.
   - Reasoning: Basic error handling is sufficient for local development and debugging, but advanced error handling will be required in production to ensure smooth maintenance.

3. **Pagination and Query Simplifications**:
   - Assumption: Job listings will grow over time and need pagination.
   - Shortcut: A fixed page size of 10 items is hardcoded for pagination without providing flexibility to adjust page size.
   - Reasoning: Fixed pagination provides a simple way to handle growing data and ensures performance remains steady. In future iterations, making page size adjustable would add flexibility.

---

## Technical Debt

1. **Role-Based Access Control (RBAC)**:

   - **Debt**: Lack of fine-grained permissions for different roles.
   - **Solution**: Implement RBAC, where different roles (e.g., admin, manager, employee) have different access rights. This will require extending the user model and adding middleware for route protection.

2. **Improved Error Handling and Logging**:

   - **Debt**: Limited error tracking and logging.
   - **Solution**: Add centralized logging (e.g., Winston) and integrate with an error-tracking service like Sentry. This will help identify and resolve production issues quickly.

3. **Flexible Pagination**:
   - **Debt**: Hardcoded page size may not suit all use cases.
   - **Solution**: Allow the client to define the page size via query parameters to accommodate different user needs.

---

## Future Deployment Options

For deploying this system in a production environment, the following options can be considered:

1. **Cloud Hosting (e.g., AWS, GCP, or Azure)**:

   - Use cloud platforms like AWS EC2, Google Cloud Compute, or Azure App Service for scalability.
   - Host the Express API as a containerized application using Docker and Kubernetes to manage scaling and redundancy.
   - Use managed databases like AWS RDS or Google Cloud SQL for database hosting.

2. **CI/CD Integration**:

   - Set up a Continuous Integration/Continuous Deployment (CI/CD) pipeline using platforms like GitHub Actions or CircleCI to automate testing and deployment.

3. **Database Management**:

   - Use a managed database service like MongoDB Atlas for easy scaling, monitoring, and backups.

4. **Load Balancing**:

   - Use load balancers (e.g., AWS ELB) to distribute traffic between multiple instances of the API server.

5. **Security Considerations**:
   - Implement HTTPS with SSL/TLS encryption to secure all data in transit.
   - Use a service like AWS Secrets Manager or Azure Key Vault to securely store sensitive credentials like JWT secrets and database URIs.
   - Consider rate limiting and IP whitelisting for critical routes (e.g., admin actions).

By implementing these strategies, the system will be prepared for production-level traffic and maintenance.
