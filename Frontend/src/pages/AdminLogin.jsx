import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import LoadingButtons from "../components/LoadingButton";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isResponse, setIsResponse] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage({});
        setSuccessMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.email) {
            setErrorMessage({ email: "Email is required" });
            return;
        }

        if (!formData.password) {
            setErrorMessage({ password: "Password is required" });
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setErrorMessage({ email: "Invalid email format" });
            return;
        }

        try {
            setIsResponse(false);
            setErrorMessage({});
            setSuccessMessage("");
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setIsResponse(true);
            const result = await response.json();

            if (!response.ok || !result.success) {
                setErrorMessage({ server: result.message || "Login failed" });
                return;
            }

            setSuccessMessage("Login successfull! Redirecting...");
            localStorage.setItem("adminToken", result.token);
            setTimeout(() => navigate("/admin"), 1500);
        } catch (error) {
            setErrorMessage({ server: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-green-100 p-6">
            <div className="absolute top-4 w-[95%]">
                <NavbarAdmin />
            </div>

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 mt-8">
                <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
                    Admin Login
                </h1>

                {/* Error Box */}
                {errorMessage.email || errorMessage.password || errorMessage.server && (
                    <div className="w-full border-red-800 bg-red-100 border rounded-md flex justify-center items-center transition-all">
                        {errorMessage.email && <p className="text-red-600 text-sm text-center p-2">{errorMessage.email}</p>}
                        {errorMessage.password && <p className="text-red-600 text-sm text-center p-2">{errorMessage.password}</p>}
                        {errorMessage.server && <p className="text-red-600 text-sm text-center p-2">{errorMessage.server}</p>}
                    </div>
                )}
                {successMessage && (
                    <div className="w-full border-green-800 bg-green-100 border rounded-md flex justify-center items-center transition-all">
                        <p className="text-green-600 text-sm text-center p-2">{successMessage}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all
                                    ${errorMessage.email ? "border-red-500" : "border-gray-300"}`}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all
                                    ${errorMessage.password ? "border-red-500" : "border-gray-300"}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {!isResponse ? (
                        <LoadingButtons text={'Logging in'}/>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 
                               rounded-lg transition-all duration-300 shadow hover:shadow-lg"
                        >
                            Login
                        </button>
                    )}
                </form>

                {/* Forgot Password */}
                <p className="text-sm text-gray-600 text-center mt-6">
                    Forgot your password?{" "}
                    <span className="text-green-600 font-semibold cursor-pointer hover:underline">
                        Reset here
                    </span>
                </p>
            </div>
        </div>
    );
}
