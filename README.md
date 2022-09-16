# Job Tracker Application

## Summary

This responsive SPA has multiple views that allows users to maintain their own job tracker with follow up dates to indicate when they should next follow up with the company.


## Features

- Add a new user to access this application
- View your jobs
- Move existing job to completed page
- Delete unnecessary jobs
- Add new job with role, company and follow up dates
- Move completed job back to job tracker
- Sort job by ascending, descending order of follow up dates or reset to get the originally loaded job list
- Easy to use job cards with clean layout
- Proxy is used


## Other features

- Complex UIs:
  1. Sort job by ascending, descending order of follow up dates or reset to get the originally loaded job list
  2. Added overlays for 'Add' and 'Delete' functionalities
- UI interactions that require state management: 
  1. Add job form errors are implemented using state management to show/not show errors as UI interactions in AddJobs.jsx
  2. Move between jobs in Tracker page and Completed page by clicking on buttons controlled by state management of job in JobList.jsx and Completed.jsx


### Validations added

- Front-end and back-end input validations
- Responsive application
- Follows mobile-first CSS
- Security validations in server side
- Giving username input as 'dog' will throw error. This validation acts as the authentication step for users


### Other practices followed

- CSS selectors are present as per their structure in jsx files
- media query prefers-reduced-motion is followed


### Deployment

- Go to tracker folder in iterm
- Run command: npm install
- Run command: npm run build
- Run command: npm start
- Click on http://localhost:4000 to view the project

OR

- Go to tracker folder in iterm
- Run command: npm install
- Run command: npm start in one terminal window
- Run command: npm run dev in another terminal window
- Development server will be automatically started and visible in browser

