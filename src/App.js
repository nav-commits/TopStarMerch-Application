import "./App.css";
import Products from "./Components/Products";
import TopBar from "./Components/TopBar";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import TransactionDetails from "./Components/TransactionDetails";
import Home from "./Components/Home";
import React from "react";

function App() {
  return (
    <div className="App">
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/TransactionDetails" element={<TransactionDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
