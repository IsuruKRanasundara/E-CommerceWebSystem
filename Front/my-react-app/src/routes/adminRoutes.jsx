import React from "react";

import About from "../pages/user/about.jsx";
import {  Routes, Route } from "react-router-dom";
import SignIn from "../pages/user/signIn.jsx";
import Ecommerce from "../pages/user/products.jsx";
import ContactUs from "../pages/user/contactUs.jsx";
import SignUp from "../pages/user/signup.jsx";
import NotFound from "../pages/user/not-found.jsx";
import CartList from "../pages/user/cartList.jsx";
import AdminDashboard from "@/pages/admin/dashboard.jsx";

function AdminNavRoute() {

    return (
        <>



            <Routes>
                <Route path={"*"} element={<NotFound />} />
                <Route path={"/"} element={<Ecommerce/> } />
                <Route path={"/admin/dashboard"} element={<AdminDashboard />}/>

            </Routes>

        </>
    )
}

export default AdminNavRoute;
// To handle the admin routes