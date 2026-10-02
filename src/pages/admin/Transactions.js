import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../redux/transactionSlice";

function Transactions() {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const users = useSelector(
    (state) => state.users.users
  );

  const [formData, setFormData] = useState({
    userId: "",
    type: "Deposit",
    amount: "",
    date: "",
    status: "Completed",
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
      type: "Deposit",
      amount: "",
      date: "",
      status: "Completed",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("Please select a user.");
      return;
    }

    const transactionData = {
      userId: Number(formData.userId),
      type: formData.type,
      amount: Number(formData.amount),
      date:
        formData.date ||
        new Date().toLocaleDateString(),
      status: formData.status,
    };

    if (editingId) {
      dispatch(
        updateTransaction({
          id: editingId,
          ...transactionData,
        })
      );

      alert(
        "Transaction updated successfully!"
      );
    } else {
      dispatch(
        addTransaction({
          id: Date.now(),
          ...transactionData,
        })
      );

      alert(
        "Transaction added successfully!"
      );
    }

    resetForm();
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);

    setFormData({
      userId: String(transaction.userId),
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      status: transaction.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteTransaction(id));

    alert(
      "Transaction deleted successfully!"
    );
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
          Transaction Management
        </h2>

        <p className="text-secondary">
          Manage and monitor banking transactions
        </p>

      </div>

      {/* Form */}

      <div className="card-purple p-4 mb-5">

        <h4 className="fw-bold mb-4">
          {editingId
            ? "Update Transaction"
            : "Add Transaction"}
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                User
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
                Transaction Type
              </label>

              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Deposit">
                  Deposit
                </option>

                <option value="Withdrawal">
                  Withdrawal
                </option>

                <option value="Transfer Sent">
                  Transfer Sent
                </option>

                <option value="Transfer Received">
                  Transfer Received
                </option>
              </select>

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Amount
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  AED
                </span>

                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />

              </div>

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />

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
                <option value="Completed">
                  Completed
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Failed">
                  Failed
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
                ? "Update Transaction"
                : "Add Transaction"}
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

      {/* Transactions Table */}

      <div className="card-purple p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold mb-0">
            All Transactions
          </h4>

          <span className="badge bg-purple">
            {transactions.length} Transactions
          </span>

        </div>

        {transactions.length === 0 ? (

          <div className="text-center py-5">

            <p className="text-secondary mb-0">
              No transactions available.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {[...transactions]
                  .reverse()
                  .map((transaction) => (

                    <tr key={transaction.id}>

                      <td className="fw-semibold">
                        {getUserName(
                          transaction.userId
                        )}
                      </td>

                      <td>
                        {transaction.type}
                      </td>

                      <td className="fw-semibold">
                        AED{" "}
                        {Number(
                          transaction.amount
                        ).toLocaleString()}
                      </td>

                      <td>
                        {transaction.date}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            transaction.status ===
                            "Completed"
                              ? "bg-success"
                              : transaction.status ===
                                "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {transaction.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() =>
                            handleEdit(
                              transaction
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(
                              transaction.id
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

export default Transactions;