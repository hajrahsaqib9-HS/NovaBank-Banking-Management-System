import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-md-6">
              <span className="badge bg-purple mb-3">
                Secure Digital Banking
              </span>

              <h1 className="display-4 fw-bold">
                Banking Made
                <span className="text-purple"> Simple & Secure</span>
              </h1>

              <p className="lead text-secondary mt-3">
                Manage your account, deposits, withdrawals and transfers
                easily from one secure banking platform.
              </p>

              <div className="mt-4">
                <Link to="/login" className="btn btn-purple px-4 py-2 me-2">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-secondary px-4 py-2"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-md-6 mt-5 mt-md-0">
              <div className="card-purple p-4">
                <h5 className="text-purple">Your Banking Overview</h5>

                <div className="row mt-4">

                  <div className="col-6 mb-3">
                    <div className="p-3 rounded bg-light">
                      <small className="text-secondary">
                        Available Balance
                      </small>
                      <h4 className="mt-2">AED 25,000</h4>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="p-3 rounded bg-light">
                      <small className="text-secondary">
                        Account Status
                      </small>
                      <h4 className="mt-2 text-success">Active</h4>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="p-3 rounded" style={{ backgroundColor: "#eee6ff" }}>
                      <small className="text-secondary">
                        Recent Transaction
                      </small>
                      <div className="d-flex justify-content-between mt-2">
                        <span>Deposit</span>
                        <strong className="text-success">+ AED 5,000</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Everything You Need</h2>
            <p className="text-secondary">
              Simple tools for managing your banking activities.
            </p>
          </div>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card-purple p-4 h-100">
                <h5 className="text-purple">Easy Deposits</h5>
                <p className="text-secondary">
                  Deposit money and keep your account balance updated.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card-purple p-4 h-100">
                <h5 className="text-purple">Quick Transfers</h5>
                <p className="text-secondary">
                  Transfer funds easily and securely between accounts.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card-purple p-4 h-100">
                <h5 className="text-purple">Transaction History</h5>
                <p className="text-secondary">
                  View and manage all your banking transactions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;