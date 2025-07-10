// should be create a signup page using react and tailwindcss n jsx format using orange and white colors and there should be intrtactive animations the web sitw is e commerce web .in teractive real ages can display in signup page .alignment should be modern
import React, { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup logic
    alert("Signup successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-white to-orange-100 flex items-center justify-center relative overflow-hidden">
      {/* Animated floating e-commerce image */}
      <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 z-0 animate-float">
        <img
          src="https://images.unsplash.com/photo-1513708927688-890fe1a2e9e6?auto=format&fit=crop&w=400&q=80"
          alt="E-commerce hero"
          className="w-72 h-72 object-cover rounded-3xl shadow-2xl border-4 border-orange-500"
        />
      </div>
      <form
        className="relative z-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl px-10 py-12 w-full max-w-md flex flex-col gap-6 border-2 border-orange-300 animate-slidein"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-orange-500 mb-2 text-center drop-shadow-md">
          Create Your Account
        </h2>
        <p className="mb-4 text-gray-700 text-center">
          Join our e-commerce community and discover amazing deals!
        </p>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full transition duration-300"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-700"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200"
        >
          Sign Up
        </button>
        <div className="text-center text-sm mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:underline font-semibold"
          >
            Log in
          </a>
        </div>
      </form>
      {/* Animations */}
      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(-20px) scale(1); }
          50% { transform: translateY(20px) scale(1.05);}
        }
        .animate-slidein {
          animation: slidein 1s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes slidein {
          0% { opacity: 0; transform: translateY(80px) scale(0.96);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
      `}</style>
    </div>
  );
}