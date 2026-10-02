import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateBalance } from "../../redux/accountSlice";
import { addTransaction } from "../../redux/transactionSlice";

function Withdraw() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const userAccount = accounts.find(
    (account) =>
      account.userId === currentUser?.id
  );

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();

    setError("");

    const withdrawAmount = Number(amount);
    const currentBalance = Number(
      userAccount?.balance || 0
    );

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!userAccount) {
      setError("Bank account not found.");
      return;
    }

    if (withdrawAmount > currentBalance) {
      setError(
        "Insufficient balance. You cannot withdraw more than your available balance."
      );
      return;
    }

    const newBalance =
      currentBalance - withdrawAmount;

    dispatch(
      updateBalance({
        id: userAccount.id,
        balance: newBalance,
      })
    );

    dispatch(
      addTransaction({
        id: Date.now(),
        userId: currentUser.id,
        type: "Withdrawal",
        amount: withdrawAmount,
        date: new Date().toLocaleDateString(),
        status: "Completed",
      })
    );

    alert("Money withdrawn successfully!");

    navigate("/user/dashboard");
  };

  return (
    <div className="container py-5">

      <div
        className="card-purple p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >

        <div className="text-center mb-4">

          <h2 className="text-purple fw-bold">
            Withdraw Money
          </h2>

          <p className="text-secondary">
            Withdraw money from your bank account
          </p>

        </div>

        {/* Current Balance */}

        <div className="bg-light rounded p-3 mb-4">

          <small className="text-secondary">
            Available Balance
          </small>

          <h3 className="text-purple fw-bold mb-0">
            AED{" "}
            {currentBalance(
              userAccount?.balance
            ).toLocaleString()}
          </h3>

        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleWithdraw}>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Withdrawal Amount
            </label>

            <div className="input-group">

              <span className="input-group-text">
                AED
              </span>

              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                min="1"
                step="0.01"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-purple w-100 py-2"
          >
            Withdraw Money
          </button>

        </form>

        <button
          className="btn btn-link w-100 mt-3 text-secondary"
          onClick={() =>
            navigate("/user/dashboard")
          }
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

function currentBalance(balance) {
  return Number(balance || 0);
}

export default Withdraw;