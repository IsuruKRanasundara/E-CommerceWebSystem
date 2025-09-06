import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/user/about.jsx";
import SignIn from "../pages/user/signIn.jsx";
import Ecommerce from "../pages/user/products.jsx";
import ContactUs from "../pages/user/contactUs.jsx";
import SignUp from "../pages/user/signup.jsx";
import NotFound from "../pages/user/not-found.jsx";
import Footer from "@/component/common/footer.jsx";
import ModernNavigationBar from "@/component/common/navBar.jsx";
import EcommerceServices from "@/pages/user/service.jsx";
import Checkout from "@/pages/user/checkout.jsx";


function MainNavRoute() {
    return (
        <>
            <header>
                <ModernNavigationBar />
            </header>
            <section>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Ecommerce />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/services" element={<EcommerceServices/>} />
                    <Route path="/checkout" element={<Checkout />} />

                </Routes>
            </section>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default MainNavRoute;