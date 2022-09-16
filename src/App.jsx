import { useState, useEffect, useReducer } from 'react';
import {
  initialState,
  reducer,
  setLoginAction,
  setLogoutAction,
  setErrorAction,
  setJobsAction,
  setSessionAction,
  setAddNewJobAction,
  setRemoveJobAction,
  setUpdateJobAction,
} from './reducer';
import {
  fetchSession,
  fetchLogin
} from './services';
import JobsContext from './JobContext';
import HomeContext from './HomeContext';
import PrivacyContext from './PrivacyContext';
import CompletedContext from './CompletedContext';
import Nav from './Nav';
import Home from './Home';
import JobList from './JobList';
import Completed from './Completed';
import Privacy from './Privacy';
import './App.css';
import './Nav.css';
import './Home.css';
import './JobList.css';
import './Completed.css';
import './Privacy.css';

function App() {

  const [possibleUsername, setPossibleUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const defaultPage = document.location.hash.replace('#', '');
  const [page, setPage] = useState(defaultPage || 'Home');

  function onLogin(username, jobs, error) {
    dispatch(setLoginAction(username, jobs, error));
  }

  function onLoginSetSession(username, error) {
    dispatch(setSessionAction(username, error));
  }

  function onLogout() {
    dispatch(setLogoutAction());
    setPage('Home');
  }

  function onSetJobs(fetchedJobs, error) {
    dispatch(setJobsAction(fetchedJobs, error));
  }

  function onSetError(error) {
    dispatch(setErrorAction(error));
  }

  function onSetAddNewJobAction(jobs, error) {
    dispatch(setAddNewJobAction(jobs, error));
  }

  function onSetRemoveJobAction(jobs, error) {
    dispatch(setRemoveJobAction(jobs, error));
  }

  function onSetUpdateJobAction(jobs, error) {
    dispatch(setUpdateJobAction(jobs, error));
  }

  useEffect(() => {
    setIsLoading(true);
    fetchSession(possibleUsername)
      .then(user => {
        onLoginSetSession(possibleUsername, '');
      })
      .catch(error => {
        onSetError('You are not logged in. Please login to continue');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setPossibleUsername, setIsLoading]
  );

  function getLogin() {
    if (possibleUsername) {
      fetchLogin(possibleUsername)
        .then(fetchedJobs => {
          onLogin(possibleUsername, fetchedJobs, '');
        })
        .catch(error => {
          onSetError('Invalid username, please try again');
        });
    }
  }

  return (
    <div className="app">

      {isLoading && <div id="loading"></div>}
      {state.error && <p className="error">{state.error}</p>}
      {state.loggedIn === false ?
        <div className="login">
          <h2>Job Tracker</h2>
          <form className="login-form" action="#">
            <div><span className="required" >*</span> indicates required fields</div>
            <div className="username-field">
              <label htmlFor="login__username__label">Username<span className="required" aria-hidden="true">*</span></label><br />
              <input type="text" id="username" className="login-username" aria-labelledby="new-user" aria-required="true" value={possibleUsername} onChange={(e) => {
                setPossibleUsername(e.target.value);
              }} required />
            </div>
            <button className="login-button" type="submit" onClick={() => {
              setPossibleUsername('');
              getLogin(possibleUsername);
            }}>Login</button>
          </form>
        </div>
        :
        <div>
          <header className="header">
            <Nav page={page} setPage={setPage} />
          </header>

          <main className="main" id="main">
            {page === 'Home' &&
              <HomeContext.Provider value={{ onLogout }}>
                <Home />
              </HomeContext.Provider>
            }
            {page === 'Jobs' &&
              <JobsContext.Provider value={{ state, onLogout, onSetJobs, onSetError, onSetAddNewJobAction, onSetRemoveJobAction, onSetUpdateJobAction }}>
                <JobList />
              </JobsContext.Provider>
            }
            {page === 'Completed' &&
              <CompletedContext.Provider value={{ state, onLogout, onSetUpdateJobAction, onSetJobs, onSetError }}>
                <Completed />
              </CompletedContext.Provider>
            }
            {page === 'Privacy' &&
              <PrivacyContext.Provider value={{ onLogout }}>
                <Privacy />
              </PrivacyContext.Provider>
            }
          </main>

          <footer id="footer" className="footer">
            <p>Looking for interesting reading material, please find here my <a href="#Privacy" onClick={() => {
              setPage('Privacy');
            }}>Privacy Policy!</a>
            </p>
            <p>© 2021 Sowmya Asokan Inc.</p>
          </footer>
        </div>
      }
    </div >
  );
}

export default App;