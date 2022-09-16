const uuid = require('uuid').v4;

function makeJobList() {
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const id4 = uuid();
  const id5 = uuid();

  const jobList = {};
  const jobs = {
    [id1]: {
      id: id1,
      job: {
        role: 'Software developer',
        company: 'ABC Corp',
        followUp: new Date(2022, 04, 13, 10),
      },
      done: false,
    },
    [id2]: {
      id: id2,
      job: {
        role: 'UX Designer',
        company: 'Manta Corp',
        followUp: new Date(2022, 05, 01, 9),
      },
      done: false,
    },
    [id3]: {
      id: id3,
      job: {
        role: 'Taste tester',
        company: 'Creamy Cookies Inc',
        followUp: new Date(2022, 04, 25, 9),
      },
      done: true,
    },
    [id4]: {
      id: id4,
      job: {
        role: 'Sleep tester',
        company: 'Mattress Firm Inc',
        followUp: new Date(2022, 04, 10, 9),
      },
      done: false,
    },
    [id5]: {
      id: id5,
      job: {
        role: 'Chef',
        company: 'Fusions Restaurant',
        followUp: new Date(2022, 04, 17, 9),
      },
      done: false,
    },
  };

  jobList.contains = function contains(id) {
    return !!jobs[id];
  };

  jobList.getJobs = function getJobs() {
    return jobs;
  };

  jobList.getJobs = function getJobs(isDone) {
    let results = Object.keys(jobs).reduce(function (pendingJobs, id) {
      if (jobs[id].done === isDone) pendingJobs[id] = jobs[id];
      return pendingJobs;
    }, {});
    return results;
  };

  jobList.getJobsSortedInAscendingFollowUpTime = function getJobsSortedInAscendingOrderOfFollowUpTime() {
    const sortedInAscending = {};
    Object.keys(jobs).sort(function (a, b) {
      return jobs[a].job.followUp - jobs[b].job.followUp;
    }).forEach(function (key) {
      if (jobs[key].done === false) {
        sortedInAscending[key] = jobs[key];
      }
    });
    return sortedInAscending;
  }

  jobList.getJobsSortedInDescendingFollowUpTime = function getJobsSortedInDescendingOrderOfFollowUpTime() {
    const sortedInDescending = {};
    Object.keys(jobs).sort(function (a, b) {
      return jobs[b].job.followUp - jobs[a].job.followUp;
    }).forEach(function (key) {
      if (jobs[key].done === false) {
        sortedInDescending[key] = jobs[key];
      }
    });
    return sortedInDescending;
  }

  jobList.addJob = function addJob(job) {
    const id = uuid();
    jobs[id] = {
      id,
      job,
      done: false,
    };
    return id;
  };

  jobList.getJob = function getJob(id) {
    return jobs[id];
  };

  jobList.updateJob = function updateJob(id, job) {
    jobs[id].done = job.done ?? jobs[id].done;
    jobs[id].job.role = job.role || jobs[id].job.role;
    jobs[id].job.company = job.company || jobs[id].job.company;
  };

  jobList.deleteJob = function deleteJob(id) {
    delete jobs[id];
  };

  jobList.setJobRole = function setJobRole(id, job) {
    jobs[id].job.role = job.role;
  }

  jobList.setJobCompany = function setJobCompany(id, job) {
    jobs[id].job.company = job.company;
  }

  return jobList;
};

module.exports = {
  makeJobList,
};
