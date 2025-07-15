import React from "react";

import About from "../pages/user/about.jsx";
import {  Routes, Route } from "react-router-dom";
import SignIn from "../features/user/signIn.jsx";
import Ecommerce from "../features/product/products.jsx";
import ContactUs from "../pages/user/contactUs.jsx";
import SignUp from "../features/user/signup.jsx";
import NotFound from "../pages/notFound.jsx";
import CartList from "../features/cart/cartList.jsx";

function MainNavRoute() {

    return (
        <>



            <Routes>
                    <Route path={"*"} element={<NotFound />} />
                    <Route path={"/"} element={<Ecommerce/> } />
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/signIn"} element={<SignIn />} />
                    <Route path={"/signUp"} element={<SignUp />} />
                    <Route path={"/contact"} element={<ContactUs />} />
                </Routes>

        </>
    )
}

export default MainNavRoute;
