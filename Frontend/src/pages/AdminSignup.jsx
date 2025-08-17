import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaKey, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import LoadingButtons from "../components/LoadingButton";

export default function AdminSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: '',
        password: "",
        confirmPassword: "",
        accessCode: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isResponse, setIsResponse] = useState(true);

    const handleChange = (e) => {
        setErrorMessage('')
        setSuccessMessage('')
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(emailRegex.test(formData.email) === false){
            setErrorMessage("Invalid email format!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            setErrorMessage('')
            setSuccessMessage('')
            setIsResponse(false)
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            setIsResponse(true)
            const result = await response.json();
            if (!response.ok || !result.success) {
                setErrorMessage(result.message || "Signup failed");
                return;
            }

            setSuccessMessage("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/admin/login"), 1500);
        } catch (error) {
            setIsResponse(true)
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-green-100 p-6">
            <div className="absolute top-4 w-[95%]">
                <NavbarAdmin />
            </div>

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 mt-20">
                <h1 className="text-3xl font-bold text-green-600 mb-2 text-center">
                    Admin Signup
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Create your secure admin account
                </p>

                {errorMessage && (
                    <div className="w-full border-red-800 bg-red-100 border rounded-md flex justify-center items-center transition-all">
                        <p className="text-red-600 text-center p-2">{errorMessage}</p>
                    </div>
                )}
                {successMessage && (
                    <div className="w-full border-green-800 bg-green-100 border rounded-md flex justify-center items-center transition-all">
                        <p className="text-green-600 text-center p-2">{successMessage}</p>
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
                                value={formData.email || ""}
                                onChange={handleChange}
                                placeholder="user@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-green-500 focus:border-green-500 
                hover:border-green-400 focus:outline-none transition-all"
                                required

                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
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
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all"
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Admin Access Code */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Admin Access Code</label>
                        <div className="relative">
                            <FaKey className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                name="accessCode"
                                value={formData.accessCode}
                                onChange={handleChange}
                                placeholder="Enter secret access code"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                                    focus:ring-2 focus:ring-green-500 focus:border-green-500 
                                    hover:border-green-400 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    {isResponse ? (
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 
                            rounded-lg transition-all duration-300 shadow hover:shadow-lg"
                        >
                            Sign Up
                        </button>
                    ) : (<LoadingButtons text={'Signing Up'} />)}
                </form>

                {/* Switch to Login */}
                <p className="text-sm text-gray-600 text-center mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/admin/login")}
                        className="text-green-600 font-semibold cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}
