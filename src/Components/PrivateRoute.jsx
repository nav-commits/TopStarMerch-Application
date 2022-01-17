
import React from "react";
import { withAuthenticationRequired} from "@auth0/auth0-react";
import { Route} from "react-router-dom";
import { Loading } from '../Components/index'

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);
  
  export default ProtectedRoute;