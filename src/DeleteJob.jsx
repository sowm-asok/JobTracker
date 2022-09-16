import { useState } from 'react';

function DeleteJob({ job, addAbilityToRemoveJob }) {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickOpen = () => {
    setIsDeleting(true);
  };

  const handleClose = () => {
    setIsDeleting(false);
  };

  return (
    <div className="delete">
      {!isDeleting &&
        <button type="submit" className="delete-button" onClick={handleClickOpen}>Delete</button>
      }
      {isDeleting &&
        <div id="overlay">
          <form id="overlay-text" className="delete-form">
            <button type="submit" className="close-overlay" onClick={handleClose}>&#10060; </button>
            <h3>Do you want to delete this job?</h3>
            <div className="delete-actions">
              <button type="submit" className="cancel" onClick={handleClose}>Cancel</button>
              <button type="submit" className="job-delete" data-id={job.id} onClick={(e) => {
                e.preventDefault();
                addAbilityToRemoveJob(job.id);
              }}>Confirm</button>
            </div>
          </form>
        </div >
      }
    </div >
  );
}

export default DeleteJob;