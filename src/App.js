import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/navbar";
import AdminNavbar from "./components/AdminNavbar";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import UserDashboard from "./pages/user/UserDashboard";
import Deposit from "./pages/user/Deposit";
import Withdraw from "./pages/user/Withdraw";
import Transfer from "./pages/user/Transfer";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Accounts from "./pages/admin/Accounts";
import Transactions from "./pages/admin/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  const role = useSelector(
    (state) => state.auth.role
  );

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage && role === "admin" ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/deposit"
          element={
            <ProtectedRoute role="user">
              <Deposit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/withdraw"
          element={
            <ProtectedRoute role="user">
              <Withdraw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/transfer"
          element={
            <ProtectedRoute role="user">
              <Transfer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/accounts"
          element={
            <ProtectedRoute role="admin">
              <Accounts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute role="admin">
              <Transactions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;