import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const userAccount = accounts.find(
    (account) =>
      account.userId === currentUser?.id
  );

  const userTransactions = transactions
    .filter(
      (transaction) =>
        transaction.userId === currentUser?.id
    )
    .reverse();

  const balance = userAccount?.balance || 0;

  return (
    <div className="container py-5">

      {/* Welcome */}

      <div className="mb-4">

        <h2 className="text-purple fw-bold">
          Welcome, {currentUser?.name}
        </h2>

        <p className="text-secondary">
          Manage your NovaBank account
          from your dashboard.
        </p>

      </div>

      {/* Balance Card */}

      <div className="row g-4 mb-5">

        <div className="col-lg-8">

          <div
            className="card-purple p-4 h-100"
            style={{
              background:
                "linear-gradient(135deg, #6f42c1, #4b2889)",
              color: "white",
            }}
          >

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <p className="mb-2 opacity-75">
                  Available Balance
                </p>

                <h1 className="fw-bold mb-3">
                  AED {balance.toLocaleString()}
                </h1>

                <p className="mb-0 opacity-75">
                  Account Number
                </p>

                <h5 className="mb-0">
                  {userAccount?.accountNumber ||
                    "Not Available"}
                </h5>

              </div>

              <div className="text-end">

                <span className="badge bg-light text-purple">
                  {userAccount?.status ||
                    "Active"}
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-4">

          <div className="card-purple p-4 h-100">

            <p className="text-secondary mb-2">
              Account Type
            </p>

            <h3 className="text-purple fw-bold">
              {userAccount?.accountType ||
                "Savings"}
            </h3>

            <hr />

            <p className="text-secondary mb-1">
              Account Holder
            </p>

            <h5 className="fw-bold">
              {currentUser?.name}
            </h5>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="card-purple p-4 mb-5">

        <h4 className="fw-bold mb-4">
          Banking Services
        </h4>

        <div className="row g-3">

          <div className="col-md-4">

            <button
              className="btn btn-purple w-100 py-3"
              onClick={() =>
                navigate("/user/deposit")
              }
            >
              Deposit Money
            </button>

          </div>

          <div className="col-md-4">

            <button
              className="btn btn-outline-secondary w-100 py-3"
              onClick={() =>
                navigate("/user/withdraw")
              }
            >
              Withdraw Money
            </button>

          </div>

          <div className="col-md-4">

            <button
              className="btn btn-outline-secondary w-100 py-3"
              onClick={() =>
                navigate("/user/transfer")
              }
            >
              Transfer Money
            </button>

          </div>

        </div>

      </div>

      {/* Transaction History */}

      <div className="card-purple p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h4 className="fw-bold mb-1">
              Transaction History
            </h4>

            <p className="text-secondary mb-0">
              Your recent banking activity
            </p>

          </div>

          <span className="badge bg-purple">
            {userTransactions.length} Transactions
          </span>

        </div>

        {userTransactions.length === 0 ? (

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
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {userTransactions.map(
                  (transaction) => (

                    <tr key={transaction.id}>

                      <td>
                        <span className="fw-semibold">
                          {transaction.type}
                        </span>
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

export default UserDashboard;