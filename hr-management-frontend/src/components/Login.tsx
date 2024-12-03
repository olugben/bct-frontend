import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage]=useState("")
  
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
      alert("Login successful");
      console.log(response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode<JwtPayload>(token);

      localStorage.setItem("role", decodedToken.role);
      console.log(decodedToken.role);
      if (decodedToken.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (errorMessage) {
      setErrorMessage(`Invalid credentials, please try again  ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">BCT-HR-ERP</h1>
          <p className="text-gray-600">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.94 3.94a8 8 0 1111.32 11.32l-5.57 2.22a1.5 1.5 0 01-2.12-1.74l1.05-2.63a8.07 8.07 0 01-.88-.34l1.94-1.94a1.5 1.5 0 112.12-2.12l1.94-1.94a8.07 8.07 0 01-.34-.88l-2.63 1.05a1.5 1.5 0 01-1.74-2.12l2.22-5.57a8 8 0 01-11.32 11.32z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg className="absolute right-3 top-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zm1 13H9v-2h2v2zm0-4H9V5h2v5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
