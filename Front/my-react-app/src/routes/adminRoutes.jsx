import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/user/not-found.jsx";
import AdminDashboard from "../pages/admin/dashboard.jsx";
import AdminHeader from "../component/admin/AdminHeader.jsx";
import AdminSidebar from "../component/admin/AdminSideBar.jsx";
import ProductManagement from "../pages/admin/ProductManagement.jsx";
import UserManagement from "../pages/admin/UserManagement.jsx";
import OrderManagement from "../pages/admin/OrderManagement.jsx";
import CategoryManagement from "../pages/admin/CategoryManagement.jsx";

function AdminRoutes() {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/orders" element={<OrderManagement />} />
                        <Route path="/categories" element={<CategoryManagement />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default AdminRoutes;
