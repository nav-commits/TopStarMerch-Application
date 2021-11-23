import "./App.css";
import Products from "./Components/Products";
import TopBar from "./Components/TopBar";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import React from "react";

function App() {
  return (
    <div className="App">
      <TopBar />
      <main>
        <Routes>
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/ProductDetails/:id" element={<ProductDetails/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
