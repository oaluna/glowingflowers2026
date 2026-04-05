import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Used to redirect the user after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      if (isLogin) {
        // Real Firebase Login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Welcome back to Glowing Flowers!");
      } else {
        // Real Firebase Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      }
      navigate("/"); // Send them back to the catalog after success
    } catch (err: any) {
      console.error("Auth Error:", err.message);
      setError("Failed to authenticate. Please check your credentials.");
    }
  };

  const inputStyles =
    "w-full p-3 mt-1 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500";

  return (
    <div className="max-w-md mx-auto p-8 mt-16 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          {isLogin ? "Welcome Back" : "Join Glowing Flowers"}
        </h2>
      </div>

      {/* Show error messages if they fail to log in */}
      {error && (
        <div className="mb-4 text-red-400 text-sm font-semibold text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="text-sm font-semibold text-gray-300">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
        </label>

        <label className="text-sm font-semibold text-gray-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyles}
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-500 transition-colors"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 hover:text-pink-400 text-sm font-medium transition-colors"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
