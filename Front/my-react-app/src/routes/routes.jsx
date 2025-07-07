import React from "react";

import About from "../pages/about.jsx";
import {  Routes, Route } from "react-router-dom";
import SignIn from "../pages/signIn.jsx";
import Ecommerce from "../pages/products.jsx";
import CartList from "../component/cartList.jsx";
import ContactUs from "../pages/contactUs.jsx";
function MainNavRoute() {

    return (
        <>



                <Routes>
                    <Route path={"/"} element={<Ecommerce/> } />
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/signIn"} element={<SignIn />} />
                    <Route path={"/contact"} element={<ContactUs />} />
                </Routes>

        </>
    )
}

export default MainNavRoute;
