import React from "react";
import './App.css'

import MainNavRoute from "./routes/userRoutes.jsx";
import AdminNavRoute from "./routes/adminRoutes.jsx"; // Add this import

function App() {
    const isAdmin = window.location.pathname.startsWith('/admin');

    return (
        <>

                {isAdmin ? <AdminNavRoute /> : <MainNavRoute />}

        </>
    );
}

export default App;