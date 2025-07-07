import React from "react";

import About from "../pages/about.jsx";
import {  Routes, Route } from "react-router-dom";
import SignIn from "../pages/signIn.jsx";

function MainNavRoute() {

    return (
        <>



                <Routes>
                    <Route path={"/"} element={<strong>welcome</strong>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/signIn"} element={<SignIn/>}/>
                </Routes>

        </>
    )
}

export default MainNavRoute;
