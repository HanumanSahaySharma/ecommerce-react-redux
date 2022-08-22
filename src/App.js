import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* Components */
import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";

function App() {
   return (
      <div className="App">
         <Router>
            <Header />
            <main id="main-content">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
               </Routes>
            </main>
         </Router>
      </div>
   );
}

export default App;
