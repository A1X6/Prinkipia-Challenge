import "./pagination.scss";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage, totalJobs }) => {
  return (
    <div className="pagination-container">
      <p className="total-items">Total Jobs: {totalJobs}</p>
      <div className="pagination-buttons">
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className="prev-btn"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={onNextPage}
          className="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
