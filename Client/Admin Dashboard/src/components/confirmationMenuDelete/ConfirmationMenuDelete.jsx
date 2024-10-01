
import "./confirmationMenuDelete.css";

const ConfirmationMenuDelete = ({ onYes, onNo }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this job?</p>
        <div className="confirmation-actions">
          <button className="confirm-btn" onClick={onYes}>Yes</button>
          <button className="cancel-btn" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMenuDelete;
