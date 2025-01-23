import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import Header from "./components/Header";
import YilPage from "./pages/YilPage";
import AvantajPage from "./pages/AvantajPage";
import AtistirmaPage from "./pages/AtistirmaPage";
import IcecekPage from "./pages/IcecekPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutComplete from "./pages/CheckoutComplete";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/hemen" />} />
        <Route path="/hemen" element={<HomePage />}></Route>
        <Route path="/hemen/yilbasi" element={<YilPage />}></Route>
        <Route path="/hemen/avantaj" element={<AvantajPage />}></Route>
        <Route path="/hemen/atistirma" element={<AtistirmaPage />}></Route>
        <Route path="/hemen/icecek" element={<IcecekPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/product/:id" element={<ProductDetailPage/>}></Route> 
        <Route path="/checkout-complete" element={<CheckoutComplete/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
