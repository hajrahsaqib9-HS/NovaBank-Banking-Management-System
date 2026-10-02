import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const users = useSelector(
    (state) => state.users.users
  );

  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const totalBalance = accounts.reduce(
    (total, account) =>
      total + Number(account.balance || 0),
    0
  );

  const recentTransactions = [...transactions]
    .reverse()
    .slice(0, 5);

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="text-purple fw-bold mb-1">
            Admin Dashboard
          </h2>

          <p className="text-secondary mb-0">
            Manage users, accounts and transactions
          </p>
        </div>

        <Link
          to="/admin/users"
          className="btn btn-purple"
        >
          Manage Users
        </Link>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-md-6 col-lg-3">

          <div className="card-purple p-4 h-100">

            <p className="text-secondary mb-2">
              Total Users
            </p>

            <h2 className="text-purple fw-bold mb-1">
              {users.length}
            </h2>

            <small className="text-secondary">
              Registered users
            </small>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card-purple p-4 h-100">

            <p className="text-secondary mb-2">
              Total Accounts
            </p>

            <h2 className="text-purple fw-bold mb-1">
              {accounts.length}
            </h2>

            <small className="text-secondary">
              Bank accounts
            </small>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card-purple p-4 h-100">

            <p className="text-secondary mb-2">
              Transactions
            </p>

            <h2 className="text-purple fw-bold mb-1">
              {transactions.length}
            </h2>

            <small className="text-secondary">
              Total transactions
            </small>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card-purple p-4 h-100">

            <p className="text-secondary mb-2">
              Total Balance
            </p>

            <h2 className="text-purple fw-bold mb-1">
              AED {totalBalance.toLocaleString()}
            </h2>

            <small className="text-secondary">
              Across all accounts
            </small>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="card-purple p-4 mb-5">

        <h4 className="fw-bold mb-4">
          Quick Actions
        </h4>

        <div className="row g-3">

          <div className="col-md-4">

            <Link
              to="/admin/users"
              className="btn btn-purple w-100 py-3"
            >
              Manage Users
            </Link>

          </div>

          <div className="col-md-4">

            <Link
              to="/admin/accounts"
              className="btn btn-outline-secondary w-100 py-3"
            >
              Manage Accounts
            </Link>

          </div>

          <div className="col-md-4">

            <Link
              to="/admin/transactions"
              className="btn btn-outline-secondary w-100 py-3"
            >
              Manage Transactions
            </Link>

          </div>

        </div>

      </div>

      {/* Recent Transactions */}

      <div className="card-purple p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold mb-0">
            Recent Transactions
          </h4>

          <Link
            to="/admin/transactions"
            className="text-purple text-decoration-none fw-semibold"
          >
            View All
          </Link>

        </div>

        {recentTransactions.length === 0 ? (

          <div className="text-center py-5">

            <p className="text-secondary mb-0">
              No transactions available yet.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {recentTransactions.map(
                  (transaction) => (

                    <tr key={transaction.id}>

                      <td>
                        {transaction.userId}
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

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;