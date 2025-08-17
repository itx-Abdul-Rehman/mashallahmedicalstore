import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Email is required");
    }
    if (!emailRegex.test(email)) {
      return setError("Invalid email format");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        return setError(result.message || "Failed to send reset email");
      }

      setSuccess("Password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-green-100 p-6">
      {/* Navbar */}
      <div className="absolute top-4 w-[95%]">
        <NavbarAdmin />
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Trouble with logging in?
        </h1>

        {/* Error Message */}
        {error && (
          <div className="w-full border-red-800 bg-red-100 border rounded-md flex justify-center items-center transition-all mb-4">
            <p className="text-red-600 text-center p-2">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="w-full border-green-800 bg-green-100 border rounded-md flex justify-center items-center transition-all mb-4">
            <p className="text-green-600 text-center p-2">{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email*
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg 
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 
                  hover:border-green-400 focus:outline-none transition-all
                  ${error ? "border-red-500" : "border-gray-300"}`}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 
             rounded-lg transition-all duration-300 shadow hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Remember your password?{" "}
          <a
            href="/admin/login"
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
