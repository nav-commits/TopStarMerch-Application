
import { createContext, useState } from "react";

export const RegisterContext = createContext();
export const RegisterProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  return (
    <RegisterContext.Provider
      value={[
        username,
        setUsername,
        password,
        setPassword,
        address,
        setAddress,
        contact,
        setContact,
      ]}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};
