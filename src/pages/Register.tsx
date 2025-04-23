import { useState } from "react";
import { useAuthStore } from "../contexts/useAuthStore";
import { useUserStore } from "../contexts/useUserStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const register = useAuthStore((state) => state.register);
  const updateUserProfile = useUserStore((state) => state.updateUserProfile);
  const navigate = useNavigate();

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return { label: "Weak", color: "text-red-500" };
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && /[\W]/.test(pass))
      return { label: "Strong", color: "text-green-600" };
    return { label: "Medium", color: "text-yellow-500" };
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    const success = register(email, password);
    setIsLoading(false);

    if (success) {
      // Save name and email to user profile store
      updateUserProfile({
        firstName,
        lastName,
        email,
        address: "",
        phone: "",
        birthday: "",
        gender: "",
        city: "",
        country: "",
        postalcode: "",
        region: "",
      });

      toast.success("Account created!");
      navigate("/profile");
    } else {
      toast.error("Email already exists. Try logging in.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-red-500 to-pink-500 flex items-center justify-center py-8">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register
        </h2>

        {/* ... form inputs ... */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="First Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Last Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Password"
          />
          {password.length > 0 && (
            <p className={`text-xs mt-1 ${getPasswordStrength(password).color}`}>
              Strength:{" "}
              <span className="font-medium">
                {getPasswordStrength(password).label}
              </span>
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Confirm Password"
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="/terms"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              terms and conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
