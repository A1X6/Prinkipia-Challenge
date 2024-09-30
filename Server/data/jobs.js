const jobs = [
    {
        name: "Data Import Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Importing data from external source to the database.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "File Processing Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Processing files for content indexing.",
        retryCount: 1,
        errorMessage: ""
    },
    {
        name: "Email Notification Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Sending notifications to users via email.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Backup Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Backing up database data to cloud storage.",
        retryCount: 2,
        errorMessage: "Backup failed due to insufficient permissions."
    },
    {
        name: "Report Generation Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Generating monthly performance reports.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Validation Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Validating data integrity in the database.",
        retryCount: 1,
        errorMessage: "Validation failed due to data inconsistencies."
    },
    {
        name: "Content Scraping Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Scraping content from external websites.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "API Data Fetch Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Fetching data from external APIs.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Migration Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Migrating data from old database to new system.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "User Cleanup Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Cleaning up inactive user accounts.",
        retryCount: 3,
        errorMessage: "Failed to delete user accounts due to constraints."
    },
    {
        name: "Monthly Backup Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Creating a backup of monthly data.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Website Monitoring Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Monitoring website uptime and performance.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Log Cleanup Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Cleaning up old log files.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Quality Check Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Performing quality checks on the dataset.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "SEO Optimization Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Optimizing website for search engines.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Backup Verification Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Verifying the integrity of backup files.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Email List Update Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Updating email lists with new contacts.",
        retryCount: 2,
        errorMessage: "Update failed due to network issues."
    },
    {
        name: "Customer Feedback Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Collecting feedback from customers.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Inventory Sync Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Synchronizing inventory data with the database.",
        retryCount: 1,
        errorMessage: ""
    },
    {
        name: "API Rate Limiting Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Applying rate limiting to API endpoints.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Password Reset Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Processing password reset requests.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Compression Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Compressing data to save storage space.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "User Import Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Importing users from external file.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Data Anomaly Detection Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Detecting anomalies in the data.",
        retryCount: 3,
        errorMessage: "Detection failed due to processing errors."
    },
    {
        name: "Content Delivery Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Delivering content to users.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Webhook Processing Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Processing incoming webhooks.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Database Migration Job",
        status: "SUCCESS",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Migrating the database to a new server.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Analytics Reporting Job",
        status: "FAILED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Generating analytics reports.",
        retryCount: 2,
        errorMessage: "Failed to generate reports due to missing data."
    },
    {
        name: "User Session Cleanup Job",
        status: "QUEUED",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Cleaning up expired user sessions.",
        retryCount: 0,
        errorMessage: ""
    },
    {
        name: "Server Health Check Job",
        status: "RUNNING",
        createdBy: "66faaaa46adfed93352a5918",
        details: "Checking the health of server resources.",
        retryCount: 0,
        errorMessage: ""
    }
];

module.exports = jobs;
