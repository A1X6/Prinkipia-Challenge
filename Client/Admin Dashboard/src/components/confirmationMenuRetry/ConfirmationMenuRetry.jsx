
import "./confirmationMenuRetry.css";

const ConfirmationMenuRetry = ({ onYes, onNo }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal-content">
        <h3>Confirm Retry</h3>
        <p>Are you sure you want to retry this job?</p>
        <div className="confirmation-actions">
          <button className="confirm-btn" onClick={onYes}>Yes</button>
          <button className="cancel-btn" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMenuRetry;
