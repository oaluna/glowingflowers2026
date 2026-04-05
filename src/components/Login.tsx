import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";

const Login: React.FC = () => {
  const context = useContext(AppContext);

  // TypeScript safety check
  if (!context) {
    throw new Error("Login must be used within an AppProvider");
  }

  const { setUser } = context;

  // Toggle between Login and Sign Up modes
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: We will replace this with real Firebase Authentication later!
    console.log(`${isLogin ? "Logging in" : "Signing up"} with:`, email);

    // Simulating a successful login by updating our global Context
    setUser({
      uid: "dummy-user-id-123",
      email: email,
    });

    alert(`Successfully ${isLogin ? "logged in" : "signed up"} as ${email}!`);
  };

  // Reusable input styling
  const inputStyles =
    "w-full p-3 mt-1 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all";

  return (
    <div className="max-w-md mx-auto p-8 mt-16 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          {isLogin ? "Welcome Back" : "Join Glowing Flowers"}
        </h2>
        <p className="text-gray-400 mt-2">
          {isLogin
            ? "Sign in to access your saved cart."
            : "Create an account to save your favorite arrangements."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="text-sm font-semibold text-gray-300">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
            placeholder="you@example.com"
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
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-colors shadow-lg"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      {/* Toggle button to switch between Login and Sign Up */}
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
