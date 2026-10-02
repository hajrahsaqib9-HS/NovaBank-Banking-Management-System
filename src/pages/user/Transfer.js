import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateBalance } from "../../redux/accountSlice";
import { addTransaction } from "../../redux/transactionSlice";

function Transfer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  const users = useSelector(
    (state) => state.users.users
  );

  const accounts = useSelector(
    (state) => state.accounts.accounts
  );

  const [receiverEmail, setReceiverEmail] =
    useState("");

  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");

  const userAccount = accounts.find(
    (account) =>
      account.userId === currentUser?.id
  );

  const handleTransfer = (e) => {
    e.preventDefault();

    setError("");

    const transferAmount = Number(amount);

    if (!receiverEmail.trim()) {
      setError("Please enter receiver email.");
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!userAccount) {
      setError("Your bank account was not found.");
      return;
    }

    const currentBalance = Number(
      userAccount.balance || 0
    );

    if (transferAmount > currentBalance) {
      setError(
        "Insufficient balance for this transfer."
      );
      return;
    }

    const receiver = users.find(
      (user) =>
        user.email.toLowerCase() ===
        receiverEmail.trim().toLowerCase()
    );

    if (!receiver) {
      setError(
        "Receiver account does not exist."
      );
      return;
    }

    if (receiver.id === currentUser.id) {
      setError(
        "You cannot transfer money to your own account."
      );
      return;
    }

    const receiverAccount = accounts.find(
      (account) =>
        account.userId === receiver.id
    );

    if (!receiverAccount) {
      setError(
        "Receiver bank account was not found."
      );
      return;
    }

    const senderNewBalance =
      currentBalance - transferAmount;

    const receiverNewBalance =
      Number(receiverAccount.balance || 0) +
      transferAmount;

    // Update sender balance

    dispatch(
      updateBalance({
        id: userAccount.id,
        balance: senderNewBalance,
      })
    );

    // Update receiver balance

    dispatch(
      updateBalance({
        id: receiverAccount.id,
        balance: receiverNewBalance,
      })
    );

    // Sender transaction

    dispatch(
      addTransaction({
        id: Date.now(),
        userId: currentUser.id,
        type: "Transfer Sent",
        amount: transferAmount,
        date: new Date().toLocaleDateString(),
        status: "Completed",
        receiver: receiver.email,
      })
    );

    // Receiver transaction

    dispatch(
      addTransaction({
        id: Date.now() + 1,
        userId: receiver.id,
        type: "Transfer Received",
        amount: transferAmount,
        date: new Date().toLocaleDateString(),
        status: "Completed",
        sender: currentUser.email,
      })
    );

    alert(
      `AED ${transferAmount.toLocaleString()} transferred successfully!`
    );

    setReceiverEmail("");
    setAmount("");

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
            Transfer Money
          </h2>

          <p className="text-secondary">
            Send money to another NovaBank user
          </p>

        </div>

        {/* Available Balance */}

        <div className="bg-light rounded p-3 mb-4">

          <small className="text-secondary">
            Available Balance
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

        <form onSubmit={handleTransfer}>

          {/* Receiver Email */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Receiver Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter receiver email"
              value={receiverEmail}
              onChange={(e) =>
                setReceiverEmail(e.target.value)
              }
              required
            />

          </div>

          {/* Amount */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Transfer Amount
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
            Transfer Money
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

export default Transfer;