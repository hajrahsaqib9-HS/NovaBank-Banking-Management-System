import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAccount,
  updateAccount,
  deleteAccount,
} from "../../redux/accountSlice";

function Accounts() {
  const dispatch = useDispatch();

  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const users = useSelector(
    (state) => state.users.users
  );

  const [formData, setFormData] = useState({
    userId: "",
    accountNumber: "",
    accountType: "Savings",
    balance: "",
    status: "Active",
  });

  const [editingId, setEditingId] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      accountNumber: "",
      accountType: "Savings",
      balance: "",
      status: "Active",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("Please select a user.");
      return;
    }

    const accountData = {
      userId: Number(formData.userId),
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
      balance: Number(formData.balance),
      status: formData.status,
    };

    if (editingId) {
      dispatch(
        updateAccount({
          id: editingId,
          ...accountData,
        })
      );

      alert("Account updated successfully!");
    } else {
      dispatch(
        addAccount({
          id: Date.now(),
          ...accountData,
        })
      );

      alert("Account added successfully!");
    }

    resetForm();
  };

  const handleEdit = (account) => {
    setEditingId(account.id);

    setFormData({
      userId: String(account.userId),
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteAccount(id));

    alert("Account deleted successfully!");
  };

  const getUserName = (userId) => {
    const user = users.find(
      (user) => user.id === userId
    );

    return user
      ? user.name
      : "Unknown User";
  };

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="mb-4">

        <h2 className="text-purple fw-bold">
          Account Management
        </h2>

        <p className="text-secondary">
          Create and manage customer bank accounts
        </p>

      </div>

      {/* Form */}

      <div className="card-purple p-4 mb-5">

        <h4 className="fw-bold mb-4">
          {editingId
            ? "Update Account"
            : "Create New Account"}
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Account Holder
              </label>

              <select
                name="userId"
                className="form-select"
                value={formData.userId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select User
                </option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name} - {user.email}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Account Number
              </label>

              <input
                type="text"
                name="accountNumber"
                className="form-control"
                placeholder="e.g. PB1234567890"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Account Type
              </label>

              <select
                name="accountType"
                className="form-select"
                value={formData.accountType}
                onChange={handleChange}
              >
                <option value="Savings">
                  Savings
                </option>

                <option value="Current">
                  Current
                </option>
              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Initial Balance
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  AED
                </span>

                <input
                  type="number"
                  name="balance"
                  className="form-control"
                  placeholder="0"
                  value={formData.balance}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

          </div>

          <div className="mt-4">

            <button
              type="submit"
              className="btn btn-purple me-2"
            >
              {editingId
                ? "Update Account"
                : "Create Account"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* Accounts Table */}

      <div className="card-purple p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold mb-0">
            All Accounts
          </h4>

          <span className="badge bg-purple">
            {accounts.length} Accounts
          </span>

        </div>

        {accounts.length === 0 ? (

          <div className="text-center py-5">

            <p className="text-secondary mb-0">
              No accounts available.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Account Holder</th>
                  <th>Account Number</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {accounts.map((account) => (

                  <tr key={account.id}>

                    <td className="fw-semibold">
                      {getUserName(
                        account.userId
                      )}
                    </td>

                    <td>
                      {account.accountNumber}
                    </td>

                    <td>
                      {account.accountType}
                    </td>

                    <td className="fw-semibold">
                      AED{" "}
                      {Number(
                        account.balance
                      ).toLocaleString()}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          account.status ===
                          "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {account.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          handleEdit(account)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(
                            account.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Accounts;