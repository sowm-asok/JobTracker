import React from "react";

const PrivacyContext = React.createContext({
  default: 'Overridden by provider value'
});

export default PrivacyContext;