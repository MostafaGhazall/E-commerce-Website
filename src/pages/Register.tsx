import { useState } from "react";
import { useAuthStore } from "../contexts/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const success = register(email, password);
    if (success) {
      toast.success("Account created!");
      navigate("/profile");
    } else {
      toast.error("Email already exists. Try logging in.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      
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
        onClick={handleRegister}
        className="w-full bg-[var(--primary-maroon)] text-white py-2 rounded hover:bg-opacity-90"
      >
        Create Account
      </button>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[var(--primary-maroon)] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
