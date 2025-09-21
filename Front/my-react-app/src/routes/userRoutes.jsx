import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/user/about.jsx";
import Ecommerce from "../pages/user/products.jsx";
import ContactUs from "../pages/user/contactUs.jsx";
import NotFound from "../pages/user/not-found.jsx";
import Footer from "../component/common/footer.jsx";
import ModernNavigationBar from "../component/common/navBar.jsx";
import EcommerceServices from "../pages/user/service.jsx";
import Checkout from "../pages/user/checkout.jsx";
import CartList from "../pages/user/cartList.jsx";
import Home from "../pages/user/home.jsx";

function UserRoutes() {
    return (
        <>
            <header>
                <ModernNavigationBar />
            </header>
            <section className="min-h-screen">
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Ecommerce />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/services" element={<EcommerceServices />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/cart" element={<CartList />} />
                </Routes>
            </section>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default UserRoutes;
