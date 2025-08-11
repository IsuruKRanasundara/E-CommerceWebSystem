import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/user/about.jsx";
import SignIn from "../pages/user/signIn.jsx";
import Ecommerce from "../pages/user/products.jsx";
import ContactUs from "../pages/user/contactUs.jsx";
import SignUp from "../pages/user/signup.jsx";
import NotFound from "../pages/user/not-found.jsx";
import CartList from "../pages/user/cartList.jsx";
import ModernNavbar from "@/component/common/navBar.jsx";
import Footer from "@/component/common/footer.jsx";

function MainNavRoute() {
    return (
        <>
            <header>
                <ModernNavbar />
            </header>
            <section>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Ecommerce />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Routes>
            </section>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default MainNavRoute;