import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateBalance } from "../../redux/accountSlice";
import { addTransaction } from "../../redux/transactionSlice";

function Deposit() {
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

  const handleDeposit = (e) => {
    e.preventDefault();

    setError("");

    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!userAccount) {
      setError("Bank account not found.");
      return;
    }

    const newBalance =
      Number(userAccount.balance) +
      depositAmount;

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
        type: "Deposit",
        amount: depositAmount,
        date: new Date().toLocaleDateString(),
        status: "Completed",
      })
    );

    alert("Money deposited successfully!");

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
            Deposit Money
          </h2>

          <p className="text-secondary">
            Add money to your bank account
          </p>

        </div>

        {/* Current Balance */}

        <div className="bg-light rounded p-3 mb-4">

          <small className="text-secondary">
            Current Balance
          </small>

          <h3 className="text-purple fw-bold mb-0">
            AED{" "}
            {Number(
              userAccount?.balance || 0
            ).toLocaleString()}
          </h3>

        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleDeposit}>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Deposit Amount
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
            Deposit Money
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

export default Deposit;