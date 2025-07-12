import { ReactNode } from "react";
import { FloatingProducts } from "./floating-products";
import { ShoppingBag, Users, Package, Star } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-50 to-white relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-orange-500/5 rounded-full animate-bounce"></div>
        <div className="absolute top-[60%] left-[5%] w-16 h-16 bg-orange-500/10 rounded-full animate-pulse"></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:w-3/5 relative">
          <div className="w-full h-full relative">
            {/* Main background image */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
              alt="Modern e-commerce shopping experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-white/20"></div>

            {/* Floating Products */}
            <FloatingProducts />

            {/* Brand Section */}
            <div className="absolute top-8 left-8 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <ShoppingBag className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-white text-2xl font-bold drop-shadow-lg">ShopHub</h1>
                  <p className="text-white/90 text-sm">Premium E-commerce</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-orange-200">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <Users className="text-orange-600 text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <Package className="text-orange-600 text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">10K+</div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <Star className="text-orange-600 text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">99%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
