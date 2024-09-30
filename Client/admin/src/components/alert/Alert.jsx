import React, { useEffect, useState } from "react";
import "./alert.scss";

const Alert = ({ message, status, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 100 / (duration / 100)));
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  if (!message) return null;

  return (
    <div className="alert-overlay">
      <div
        className={`alert ${
          status === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        {message}
      </div>
    </div>
  );
};

export default Alert;
