import { useState, useEffect, useContext } from 'react';
import JobsContext from './JobContext';
import DeleteJob from './DeleteJob';
import AddJob from './AddJob';
import {
  fetchAddJob,
  fetchDeleteJob,
  fetchJobsSortedByAscendingFollowUpTime,
  fetchJobsSortedByDescendingFollowUpTime,
  fetchLogout,
} from './services';
import { loadJobs, toggleJobCompletionStatus } from './CommonJobActions';

function JobList() {

  const { state, onLogout, onSetJobs, onSetError, onSetAddNewJobAction, onSetRemoveJobAction, onSetUpdateJobAction } = useContext(JobsContext);
  const [newJob, setNewJob] = useState({});
  let newJobList = state.jobs;

  function loadPage() {
    loadJobs(onSetJobs, onSetError)
  }

  useEffect(() => {
    loadPage();
  },
    []
  );

  function addAbilityToAddJob() {
    setNewJob({});
    fetchAddJob(newJob)
      .then(job => {
        newJobList[job.id] = job;
        onSetAddNewJobAction(newJobList, '');
        loadPage();
      })
      .catch(error => {
        onSetError('Incorrect input, please try again');
      });
  }

  function addAbilityToRemoveJob(jobId) {
    const id = jobId;
    fetchDeleteJob(id)
      .then(job => {
        delete newJobList[id];
        onSetRemoveJobAction(newJobList, '');
        loadPage();
      })
      .catch(error => {
        onSetError('Unable to remove job item, please try again');
      });
  }

  function addAbilityToToggleComplete(jobId) {
    toggleJobCompletionStatus(jobId, newJobList, onSetUpdateJobAction, onSetError);
    loadPage();
  }

  function logout() {
    fetchLogout(newJob)
      .then(results => {
        onLogout();
      })
      .catch(error => {
        onSetError('You are still logged in, try logging out again');
      });
  }

  function sortByOrderOfFollowUpTime(sortType) {
    (sortType === 'ascending' ? fetchJobsSortedByAscendingFollowUpTime() : fetchJobsSortedByDescendingFollowUpTime())
      .then(fetchedJobs => {
        onSetJobs(fetchedJobs, '');
      })
      .catch(error => {
        onSetError('Unable to load job list at this time, please try again');
      });
  }

  return (
    <div className="main-jobs">
      <div className="logout">
        <button className="logout-button" type="submit" onClick={logout}>Logout</button>
      </div>
      <h3>Welcome to your job tracker</h3>
      <div className="sort">
        <h4>Sort your jobs by order of follow-up dates below:</h4>
        <div className="sort-actions">
          <button className="sort-ascending" onClick={() => {
            sortByOrderOfFollowUpTime("ascending");
          }}>Ascending</button>
          <button className="sort-descending" onClick={() => {
            sortByOrderOfFollowUpTime("descending");
          }}>Descending</button>
          <button className="sort-reset" onClick={() => {
            loadPage();
          }}>Reset</button>
        </div>
      </div>
      <div className="job-list__container">
        <ul className="job-list">
          {
            Object.values(state.jobs).map(job => (
              <li key={job.id} className="card">
                <div className="job">
                  <ul className="job-details">
                    <li className="job-toggle job-title" data-id={job.id}>{job.job.role}</li>
                    <li className="job-toggle job-text" data-id={job.id}>{job.job.company}</li>
                    <li className="job-toggle job-text" data-id={job.id}>Follow up date: {`${new Date(job.job.followUp).toDateString()}`}</li>
                  </ul>
                </div>

                <div className="job-actions">
                  <button className="job-complete" data-id={job.id} data-status={job.done} onClick={() => {
                    addAbilityToToggleComplete(job.id)
                  }}>Completed</button>
                  <DeleteJob
                    job={job}
                    addAbilityToRemoveJob={addAbilityToRemoveJob}
                  />
                </div>
              </li>
            ))
          }
        </ul>
        <AddJob
          newJob={newJob}
          setNewJob={setNewJob}
          addAbilityToAddJob={addAbilityToAddJob}
        />
      </div>
    </div >
  );
}

export default JobList;