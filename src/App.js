import "./App.css";
import Products from "./Components/Products";
import TopBar from "./Components/TopBar";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import TransactionDetails from "./Components/TransactionDetails";
import Home from "./Components/Home";
import React from "react";
import Login from "./Components/Login";
import { RegisterProvider } from "./Context/RegisterContext";
import { LoginProvider } from "./Context/LoginContext";
import interceptors from "../src/Components/Interceptors";

function App() {
  return (
    <RegisterProvider>
      <LoginProvider>
        <div className="App">
          <TopBar />
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Products" element={<Products />} />
              <Route
                exact
                path="/ProductDetails/:id"
                element={<ProductDetails />}
              />
              <Route
                exact
                path="/TransactionDetails"
                element={<TransactionDetails />}
              />
            </Routes>
          </main>
        </div>
      </LoginProvider>
    </RegisterProvider>
  );
}

export default App;
