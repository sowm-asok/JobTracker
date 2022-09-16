import {
  fetchUpdateJob,
  fetchJobs,
} from './services';

export function loadJobs(onSetJobs, onSetError) {
  fetchJobs()
    .then(fetchedJobs => {
      onSetJobs(fetchedJobs, '');
    })
    .catch(error => {
      onSetError('Unable to load job list at this time, please try again');
    });
}

export function toggleJobCompletionStatus(jobId, newJobList, onSetUpdateJobAction, onSetError) {
  const id = jobId;
  fetchUpdateJob(id, { done: !newJobList[id].done })
    .then(job => {
      newJobList[id] = job;
      onSetUpdateJobAction(newJobList, '');
    })
    .catch(error => {
      onSetError('Unable to complete job item, please try again');
    });
}