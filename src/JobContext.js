import React from "react";

const JobContext = React.createContext({
  default: 'Overridden by provider value'
});

export default JobContext;