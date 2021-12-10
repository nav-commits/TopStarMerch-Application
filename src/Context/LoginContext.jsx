

import { createContext, useState } from "react";

export const LoginContext = createContext();
export const LoginProvider = (props) => {
  const [username, setUsername] = useState("");
  return (
    <LoginContext.Provider
      value={[
        username,
        setUsername,
      ]}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
