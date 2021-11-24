import "./App.css";
import Products from "./Components/Products";
import TopBar from "./Components/TopBar";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import TransactionDetails from "./Components/TransactionDetails"
import React from "react";

function App() {
  return (
    <div className="App">
      <TopBar />
      <main>
        <Routes>
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/ProductDetails/:id" element={<ProductDetails/>} />
          <Route exact path="/TransactionDetails" element={<TransactionDetails/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
