import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    // CREATE TRANSACTION
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },

    // UPDATE TRANSACTION
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );

      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    // DELETE TRANSACTION
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;