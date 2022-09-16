import React from "react";

const HomeContext = React.createContext({
  default: 'Overridden by provider value'
});

export default HomeContext;