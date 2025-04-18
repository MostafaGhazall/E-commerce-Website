import { useState } from "react";
import { useAuthStore } from "../contexts/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    const success = login(email, password);
    if (success) {
      toast.success("Welcome back!");
      navigate("/profile");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2 text-sm font-medium">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-[var(--primary-maroon)] text-white py-2 rounded hover:bg-opacity-90"
      >
        Sign In
      </button>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-[var(--primary-maroon)] hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
