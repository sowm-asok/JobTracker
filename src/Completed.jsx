import { useEffect, useContext, useState } from 'react';
import CompletedContext from './CompletedContext';
import { fetchCompletedJobs } from './services';
import { toggleJobCompletionStatus } from './CommonJobActions';
import './JobList.css';

function Completed() {

  const { state, onLogout, onSetUpdateJobAction, onSetJobs, onSetError } = useContext(CompletedContext);

  function addAbilityToToggleComplete(jobId) {
    toggleJobCompletionStatus(jobId, state.jobs, onSetUpdateJobAction, onSetError);
    completedJobs();
  }

  function completedJobs() {
    fetchCompletedJobs()
      .then(fetchedCompletedJobs => {
        onSetJobs(fetchedCompletedJobs, '');
      })
      .catch(error => {
        onSetError('Unable to load job list at this time, please try again');
      });
  }

  useEffect(() => {
    completedJobs();
  },
    []
  );

  return (
    <div className="main-completed">
      <div className="logout">
        <button className="logout-button" type="submit" onClick={onLogout}>Logout</button>
      </div>
      {Object.keys(state.jobs).length > 0 ?
        <p>Congratulations on your successful completion of the below jobs!</p>
        :
        <p>You have not completed any jobs, strive harder!</p>
      }
      <div className="job-list__container">
        <ul className="job-list">
          {
            Object.values(state.jobs).map(job => (
              <li key={job.id} className="card">
                <div className="job">
                  <div className={`${job.done ? 'job-text-done' : ''}`}>&#9989;</div>
                  <ul className="job-details">
                    <li className="job-toggle job-title" data-id={job.id}>{job.job.role}</li>
                    <li className="job-toggle job-text" data-id={job.id}>{job.job.company}</li>
                    <li className="job-toggle job-text" data-id={job.id}>Follow up date: {`${new Date(job.job.followUp).toDateString()}`}</li>
                  </ul>
                </div>

                <div className="job-actions">
                  <button className="job-complete" data-id={job.id} data-status={job.done} onClick={() => {
                    addAbilityToToggleComplete(job.id)
                  }}>Move back to job tracker</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Completed;