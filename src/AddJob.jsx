import { useState } from 'react';

function AddJob({ newJob, addAbilityToAddJob }) {

  const [isAdding, setIsAdding] = useState(false);
  const [jobRoleError, setJobRoleError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [followUpDateError, setFollowUpDateError] = useState('');

  const handleClickOpen = () => {
    setIsAdding(true);
  };

  function handleClose() {
    setIsAdding(false);
  }

  function setNewJobRole(value) {
    newJob.role = value;
  }

  function setNewJobCompany(value) {
    newJob.company = value;
  }

  function setNewJobFollowUp(value) {
    newJob.followUp = new Date(value);
  }

  function addNewJob() {
    setJobRoleError('');
    setCompanyError('');
    setFollowUpDateError('');
    if (newJob.role === undefined) {
      setJobRoleError("Please enter a valid job role");
    }
    if (newJob.company === undefined) {
      setCompanyError("Please enter a valid company name");
    }
    if (newJob.followUp === undefined) {
      setFollowUpDateError("Please select a valid follow-up date");
    }
    else {
      setJobRoleError('');
      setCompanyError('');
      setFollowUpDateError('');
      addAbilityToAddJob();
      handleClose();
    }
  }

  return (
    <div>
      {!isAdding &&
        <button className="add-button" type="submit" onClick={handleClickOpen}>Add</button>
      }
      {isAdding &&
        <div id="overlay">
          <form id="overlay-text" action="#" className="add">
            <button type="submit" className="close-overlay" onClick={handleClose}>&#10060;</button>
            <h3>Add a new job!</h3>
            <div><span className="required" >*</span> indicates required fields. All fields are required</div>
            <div className="field">
              <label htmlFor="job-role-label">Job Role<span className="required" aria-hidden="true">*</span></label><br />
              <input type="text" className="new-job" aria-labelledby="new-job" aria-required="true" onChange={(e) => {
                setNewJobRole(e.target.value);
              }} required />
              {jobRoleError !== '' && <div className="form-error">{jobRoleError}</div>}
            </div>
            <div className="field">
              <label htmlFor="job-company-label">Company<span className="required" aria-hidden="true">*</span></label><br />
              <input type="text" className="new-company" aria-labelledby="new-company" aria-required="true" value={newJob.company} onChange={(e) => {
                setNewJobCompany(e.target.value);
              }} required />
              {companyError !== '' && <div className="form-error">{companyError}</div>}
            </div>
            <div className="field">
              <label htmlFor="job-follow-up-label">Date to follow-up with company<span className="required" aria-hidden="true">*</span></label><br />
              <input type="date" className="new-follow-up" aria-labelledby="new-follow-up" aria-required="true" value={newJob.followUp} onChange={(e) => {
                setNewJobFollowUp(e.target.value);
              }} required />
              {followUpDateError !== '' && <div className="form-error">{followUpDateError}</div>}
            </div>
            <button className="add-button" type="submit" onClick={(e) => {
              e.preventDefault();
              addNewJob();
            }}>Add</button>
          </form>
        </div >
      }
    </div >
  );
}

export default AddJob;