import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,

  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },

    updateAccount: (state, action) => {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );

      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },

    deleteAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },

    updateBalance: (state, action) => {
      const account = state.accounts.find(
        (account) => account.id === action.payload.id
      );

      if (account) {
        account.balance = action.payload.balance;
      }
    },
  },
});

export const {
  addAccount,
  updateAccount,
  deleteAccount,
  updateBalance,
} = accountSlice.actions;

export default accountSlice.reducer;