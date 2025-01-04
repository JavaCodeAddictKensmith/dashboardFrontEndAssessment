import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction {
  createdAt: string;
  name: string;
  type: string;
  amount: number;
  status: string;
  currency: string;
  invoiceNumber: string;
  id: string;
}

export type UserAcc = {
  createdAt: string;
  name: string;
  avatar: string;
  AccountBalance: string;
  revenue: string;
  id: string;
};
export type LoanHistory = {
  transactionDate: string;
  dueDate: string;
  interest: string;
  duration: string;
  status: string;
  issuer: string;
  amount: string;
  purpose: string;
  id: string;
};

interface TransactionState {
  transactions: {
    data: Transaction[];
    loading: boolean;
    error: string | null;
  };
  userAccounts: {
    data: UserAcc[];
    loading: boolean;
    error: string | null;
  };
  loanHistory: {
    data: LoanHistory[];
    loading: boolean;
    error: string | null;
  };
  loanHisDetails: {
    data: LoanHistory[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: TransactionState = {
  transactions: {
    data: [],
    loading: false,
    error: null,
  },
  userAccounts: {
    data: [],
    loading: false,
    error: null,
  },

  loanHistory: { data: [], loading: false, error: null },
  loanHisDetails: { data: [], loading: false, error: null },
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get<Transaction[]>(
      "https://6776b8d712a55a9a7d0cae0e.mockapi.io/api/v1/accountDetails"
    );
    return response.data;
  }
);

export const fetchUserAccountDetails = createAsyncThunk(
  "transactions/fetchUserAccountDetails",
  async () => {
    const response = await axios.get<UserAcc[]>(
      "https://6776b8d712a55a9a7d0cae0e.mockapi.io/api/v1/users"
    );
    return response.data;
  }
);

export const fetchUserLoanHistory = createAsyncThunk(
  "transactions/fetchUserLoanHistory",
  async () => {
    const response = await axios.get<LoanHistory[]>(
      "https://677943ae482f42b62e90e01b.mockapi.io/api/v2/Details"
    );
    return response.data;
  }
);

export const fetchUserLoanHisDetails = createAsyncThunk(
  "transactions/fetchUserLoanHisDetails",
  async () => {
    const response = await axios.get<LoanHistory[]>(
      "https://677943ae482f42b62e90e01b.mockapi.io/api/v2/activeloan"
    );
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.transactions.loading = true;
        state.transactions.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions.loading = false;
        state.transactions.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.transactions.loading = false;
        state.transactions.error =
          action.error.message || "Something went wrong";
      });

    // User Accounts
    builder
      .addCase(fetchUserAccountDetails.pending, (state) => {
        state.userAccounts.loading = true;
        state.userAccounts.error = null;
      })
      .addCase(fetchUserAccountDetails.fulfilled, (state, action) => {
        state.userAccounts.loading = false;
        state.userAccounts.data = action.payload;
      })
      .addCase(fetchUserAccountDetails.rejected, (state, action) => {
        state.userAccounts.loading = false;
        state.userAccounts.error =
          action.error.message || "Something went wrong";
      });

    // LOAN HISTORY
    builder
      .addCase(fetchUserLoanHistory.pending, (state) => {
        state.loanHistory.loading = true;
        state.loanHistory.error = null;
      })
      .addCase(fetchUserLoanHistory.fulfilled, (state, action) => {
        state.loanHistory.loading = false;
        state.loanHistory.data = action.payload;
      })
      .addCase(fetchUserLoanHistory.rejected, (state, action) => {
        state.loanHistory.loading = false;
        state.loanHistory.error =
          action.error.message || "Something went wrong";
      });

    // LOAN HISTORY Details
    builder
      .addCase(fetchUserLoanHisDetails.pending, (state) => {
        state.loanHisDetails.loading = true;
        state.loanHisDetails.error = null;
      })
      .addCase(fetchUserLoanHisDetails.fulfilled, (state, action) => {
        state.loanHisDetails.loading = false;
        state.loanHisDetails.data = action.payload;
      })
      .addCase(fetchUserLoanHisDetails.rejected, (state, action) => {
        state.loanHisDetails.loading = false;
        state.loanHisDetails.error =
          action.error.message || "Something went wrong";
      });
  },
});

export default transactionSlice.reducer;
