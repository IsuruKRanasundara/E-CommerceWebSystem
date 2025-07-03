import React from "react";

import About from "../pages/about.jsx";
import {  Routes, Route } from "react-router-dom";

function MainNavRoute() {

    return (
        <>



                <Routes>
                    <Route path={"/"} element={<strong>welcome</strong>}/>
                    <Route path={"/about"} element={<About/>}/>
                </Routes>

        </>
    )
}

export default MainNavRoute;
