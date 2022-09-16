const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const jobs = require('./jobs');

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

function isValidSessionAndUsername(sid, username) {
  if (!sid || !username) {
    return true;
  }
}

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  const allowList = new RegExp("^[A-Za-z0-9]*$");

  if (!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === 'dog' || !allowList.test(username)) {
    res.status(403).json({ error: 'auth-insufficient', message: 'Invalid username, please try again' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if (!existingUserData) {
    users.addUserData(username, jobs.makeJobList());
  }
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getJobs());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (sid) {
    res.clearCookie('sid');
  }
  if (username) {
    sessions.deleteSession(sid);
  }
  res.json({ username });
});

// Jobs
app.get('/api/jobs', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  res.json(users.getUserData(username).getJobs(false));
});

app.get('/api/jobs/completed', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  res.json(users.getUserData(username).getJobs(true));
});

app.get('/api/jobs/sorted/ascending', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const jobList = users.getUserData(username);
  res.json(jobList.getJobsSortedInAscendingFollowUpTime());
});

app.get('/api/jobs/sorted/descending', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const jobList = users.getUserData(username);
  res.json(jobList.getJobsSortedInDescendingFollowUpTime());
});

app.post('/api/jobs', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const { job } = req.body;
  if (!job) {
    res.status(400).json({ error: 'required-job', message: 'Add job and try again' });
    return;
  }
  const jobList = users.getUserData(username);
  const id = jobList.addJob(job);
  res.json(jobList.getJob(id));
});

app.get('/api/jobs/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const jobList = users.getUserData(username);
  const { id } = req.params;
  if (!jobList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
    return;
  }
  res.json(jobList.getJob(id));
});

app.put('/api/jobs/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const jobList = users.getUserData(username);
  const { id } = req.params;
  const { role, done = false } = req.body;
  if (!role) {
    res.status(400).json({ error: 'required-role' });
    return;
  }
  if (!jobList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
    return;
  }
  jobList.updateJob(id, { role, done });
  res.json(jobList.getJob(id));
});

app.patch('/api/jobs/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const { id } = req.params;
  const { role, done } = req.body;
  const jobList = users.getUserData(username);
  if (!jobList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No job with id ${id}` });
    return;
  }
  jobList.updateJob(id, { role, done });
  res.json(jobList.getJob(id));
});

app.delete('/api/jobs/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  isValidSessionAndUsername(sid, username) === true ? res.status(401).json({ error: 'auth-missing', message: 'Invalid username or session, please try again' }) : '';
  const { id } = req.params;
  const jobList = users.getUserData(username);
  const exists = jobList.contains(id);
  if (exists) {
    jobList.deleteJob(id);
  }
  res.json({ message: exists ? `job ${id} deleted` : `job ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));