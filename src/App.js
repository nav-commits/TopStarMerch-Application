import "./App.css";
import Products from "./Components/Products";
import TopBar from "./Components/TopBar";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import TransactionDetails from "./Components/TransactionDetails";
import Home from "./Components/Home";
import React from "react";
// import ProtectedRoute from "./Components/PrivateRoute";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <div className="App">
      <TopBar />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Products" element={isAuthenticated?<Products />:<Home />} />
          <Route
            exact
            path="/ProductDetails/:id"
            element={isAuthenticated?<ProductDetails />:<Home/>}
          />
          <Route
            exact
            path="/TransactionDetails"
            element={isAuthenticated?<TransactionDetails />:<Home/>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
