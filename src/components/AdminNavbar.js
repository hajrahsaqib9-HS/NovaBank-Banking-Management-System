import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/admin/dashboard"
        >
          NovaBank Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/users"
              >
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/accounts"
              >
                Accounts
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/transactions"
              >
                Transactions
              </Link>
            </li>

            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-light text-purple"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;