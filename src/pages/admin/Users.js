import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/userSlice";

function Users() {
  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.users
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
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
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(
        updateUser({
          id: editingId,
          ...formData,
        })
      );

      alert("User updated successfully!");
    } else {
      dispatch(
        addUser({
          id: Date.now(),
          ...formData,
        })
      );

      alert("User added successfully!");
    }

    resetForm();
  };

  const handleEdit = (user) => {
    setEditingId(user.id);

    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    dispatch(deleteUser(id));

    alert("User deleted successfully!");
  };

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="mb-4">

        <h2 className="text-purple fw-bold">
          User Management
        </h2>

        <p className="text-secondary">
          Add, update and manage bank users
        </p>

      </div>

      {/* Form */}

      <div className="card-purple p-4 mb-5">

        <h4 className="fw-bold mb-4">
          {editingId
            ? "Update User"
            : "Add New User"}
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Role
              </label>

              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
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
                ? "Update User"
                : "Add User"}
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

      {/* Users Table */}

      <div className="card-purple p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold mb-0">
            All Users
          </h4>

          <span className="badge bg-purple">
            {users.length} Users
          </span>

        </div>

        {users.length === 0 ? (

          <div className="text-center py-5">

            <p className="text-secondary mb-0">
              No users available.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td className="fw-semibold">
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.phone}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          user.role === "admin"
                            ? "bg-dark"
                            : "bg-purple"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          handleEdit(user)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleDelete(user.id)
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

export default Users;