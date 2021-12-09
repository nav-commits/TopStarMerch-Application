

import { createContext, useState } from "react";

export const LoginContext = createContext();
export const LoginProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <LoginContext.Provider
      value={[
        username,
        setUsername,
        password,
        setPassword,
      ]}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
