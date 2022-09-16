import React from "react";

const CompletedContext = React.createContext({
  default: 'Overridden by provider value'
});

export default CompletedContext;