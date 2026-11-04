
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { users } from "../data/users";
import { LogIn, GraduationCap } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { login, isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect an already logged-in user
  if (isAuthenticated) {
    return (
      <div>
        {navigate(
          currentUser.role === "admin" ? "/admin" : "/student"
        )}
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(email);

    if (result.success) {
      navigate(
        result.user.role === "admin" ? "/admin" : "/student"
      );
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <GraduationCap size={35} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Joineazy
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Assignment & Review Dashboard
        </p>

        <form onSubmit={handleSubmit}>

          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your email"
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Sign In
          </button>

        </form>

        <div className="mt-8 border-t pt-5">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Demo Accounts
          </p>

          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => setEmail(user.email)}
                className="w-full text-left text-sm bg-slate-50 hover:bg-blue-50 p-3 rounded-lg"
              >
                <span className="font-medium">{user.name}</span>
                <span className="block text-slate-500">
                  {user.email} · {user.role}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
