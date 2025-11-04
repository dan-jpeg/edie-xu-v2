// src/components/admin/Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import SiloHoverButton from "../SiloHoverButton.jsx";

const API_URL =
  import.meta.env.VITE_API_URL || "https://exu-admin-server.onrender.com/api";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token
        sessionStorage.setItem("adminToken", data.token);
        sessionStorage.setItem("adminAuth", "true");
        onLogin();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/90 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-black p-8 w-full max-w-sm"
      >
        <h1 className="text-[11px] uppercase tracking-wider mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-black p-3 text-[10px] mb-4"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-[9px] mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 text-[10px] uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
