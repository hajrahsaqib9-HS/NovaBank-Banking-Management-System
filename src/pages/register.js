import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { addUser } from "../redux/userSlice";
import { addAccount } from "../redux/accountSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "user",
    };

    dispatch(addUser(newUser));

    const newAccount = {
      id: Date.now() + 1,
      userId: newUser.id,
      accountNumber:
        "PB" + String(Date.now()).slice(-10),
      accountType: "Savings",
      balance: 0,
      status: "Active",
    };

    dispatch(addAccount(newAccount));

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="container py-5">

      <div
        className="card-purple p-4 mx-auto"
        style={{ maxWidth: "550px" }}
      >

        <div className="text-center mb-4">
          <h2 className="text-purple fw-bold">
            Create Account
          </h2>

          <p className="text-secondary">
           Open your NovaBank account
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-purple w-100 py-2"
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-4">
          <span className="text-secondary">
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            className="text-purple fw-semibold text-decoration-none"
          >
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;