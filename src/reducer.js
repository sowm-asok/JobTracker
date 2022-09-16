export const initialState = {
  jobs: {},
  error: '',
  loggedIn: false,
  username: '',
};

export function setJobsAction(jobs, error) {
  return {
    type: 'setJobs',
    jobs,
    error,
  };
}

export function setErrorAction(error) {
  return {
    type: 'setError',
    error,
  };
}

export function setLoginAction(username, jobs, error) {
  return {
    type: 'login',
    jobs,
    error,
    username,
  };
}

export function setSessionAction(username, error) {
  return {
    type: 'setSession',
    username,
    error,
  };
}

export function setLogoutAction() {
  return {
    type: 'logout',
  };
}

export function setAddNewJobAction(jobs, error) {
  return {
    type: 'addNewJob',
    jobs,
    error,
  }
}

export function setRemoveJobAction(jobs, error) {
  return {
    type: 'removeJob',
    jobs,
    error,
  }
}

export function setUpdateJobAction(jobs, error) {
  return {
    type: 'updateJob',
    jobs,
    error,
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'setSession':
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        error: action.error,
      };
    case 'setJobs':
      return {
        ...state,
        jobs: action.jobs,
        error: action.error,
      };
    case 'setError':
      return {
        ...state,
        error: action.error,
      };
    case 'login':
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        jobs: action.jobs,
        error: action.error,
      };
    case 'logout':
      return {
        ...state,
        loggedIn: false,
        username: '',
        jobs: {},
        error: '',
      };
    case 'addNewJob':
      return {
        ...state,
        jobs: action.jobs,
        error: action.error,
      };
    case 'removeJob':
      return {
        ...state,
        jobs: action.jobs,
        error: action.error,
      };
    case 'updateJob':
      return {
        ...state,
        jobs: action.jobs,
        error: action.error,
      };
    default:
      throw Error(`Unknown action type ${action.type}`, action);
  }
}