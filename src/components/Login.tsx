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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Welcome back to Glowing Flowers!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      }
      navigate("/");
    } catch (err: any) {
      console.error("Auth Error:", err.message);
      setError("Failed to authenticate. Please check your credentials.");
    }
  };

  const inputStyles =
    "w-full p-3 mt-2 bg-transparent text-brandEarth border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRose focus:border-transparent transition-all font-sans";
  const labelStyles =
    "text-xs font-bold font-sans uppercase tracking-widest text-brandEarth/70";

  return (
    <div className="max-w-md mx-auto p-8 mt-16 mb-20 bg-white rounded-2xl shadow-sm border border-stone-100 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-brandEarth mb-3">
          {isLogin ? "Welcome Back" : "Join Us"}
        </h2>
        <p className="text-brandEarth/60 italic">
          {isLogin
            ? "Sign in to access your saved cart."
            : "Create an account for a curated experience."}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-sans rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className={labelStyles}>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
        </label>

        <label className={labelStyles}>
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
          className="mt-2 w-full py-4 bg-brandEarth text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-brandRose transition-colors shadow-md"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-stone-100 pt-6">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-brandEarth/60 hover:text-brandRose font-sans text-xs font-bold tracking-widest uppercase transition-colors"
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
