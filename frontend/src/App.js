// ######### GENERAL ##########
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ######### PAGES ##########
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";

// ######### COMPONENTS ##########
import Header from "./components/Header";
import Footer from "./components/Footer";
import Weekly from "./pages/Weekly";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/products/all/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
