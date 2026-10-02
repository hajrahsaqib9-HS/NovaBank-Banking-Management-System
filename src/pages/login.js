import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(
    (state) => state.users.users
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    dispatch(login(foundUser));

    if (foundUser.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="container py-5">

      <div
        className="card-purple p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >

        <div className="text-center mb-4">

          <h2 className="text-purple fw-bold">
            Welcome Back
          </h2>

          <p className="text-secondary">
            Login to your NovaBank account
          </p>

        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-purple w-100 py-2"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-4">

          <span className="text-secondary">
            Don't have an account?{" "}
          </span>

          <Link
            to="/register"
            className="text-purple fw-semibold text-decoration-none"
          >
            Create Account
          </Link>

        </div>

        <div className="mt-4 p-3 bg-light rounded">

          <small className="text-secondary">
            Demo Admin Login
          </small>

          <div className="mt-2">
            <strong>Email:</strong>{" "}
            admin@purplebank.com
          </div>

          <div>
            <strong>Password:</strong>{" "}
            admin123
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;