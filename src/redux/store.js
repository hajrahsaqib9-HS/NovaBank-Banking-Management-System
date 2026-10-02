import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import accountReducer from "./accountSlice";

const savedUsers = localStorage.getItem("users");
const savedAccounts = localStorage.getItem("accounts");
const savedTransactions = localStorage.getItem("transactions");
const savedAuth = localStorage.getItem("auth");

const defaultAdmin = {
  id: 1,
  name: "System Admin",
  email: "admin@purplebank.com",
  phone: "03000000000",
  password: "admin123",
  role: "admin",
};

const usersFromStorage = savedUsers
  ? JSON.parse(savedUsers)
  : [];

const adminExists = usersFromStorage.some(
  (user) => user.role === "admin"
);

const finalUsers = adminExists
  ? usersFromStorage
  : [...usersFromStorage, defaultAdmin];

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    accounts: accountReducer,
    transactions: transactionReducer,
  },

  preloadedState: {
    auth: savedAuth
      ? JSON.parse(savedAuth)
      : undefined,

    users: {
      users: finalUsers,
    },

    accounts: {
      accounts: savedAccounts
        ? JSON.parse(savedAccounts)
        : [],
    },

    transactions: {
      transactions: savedTransactions
        ? JSON.parse(savedTransactions)
        : [],
    },
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "users",
    JSON.stringify(state.users.users)
  );

  localStorage.setItem(
    "accounts",
    JSON.stringify(state.accounts.accounts)
  );

  localStorage.setItem(
    "transactions",
    JSON.stringify(state.transactions.transactions)
  );

  localStorage.setItem(
    "auth",
    JSON.stringify(state.auth)
  );
});

export default store;