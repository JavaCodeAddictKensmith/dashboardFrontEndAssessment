export const fetchUserData = async () => ({
  name: "John Doe",
  balance: 24500.5,
  recentTransactions: [
    { id: 1, date: "2023-12-30", type: "credit", amount: 1000 },
    { id: 2, date: "2023-12-29", type: "debit", amount: 200 },
  ],
});

export const fetchLoanData = async () => ({
  history: [
    {
      id: 1,
      amount: 5000,
      tenure: "12 months",
      purpose: "Education",
      status: "Paid",
    },
    {
      id: 2,
      amount: 10000,
      tenure: "24 months",
      purpose: "Home Renovation",
      status: "Active",
    },
  ],
  activeLoan: {
    amount: 10000,
    tenure: "24 months",
    purpose: "Home Renovation",
    status: "Active",
  },
});

export const fetchTransactionHistory = async () => [
  { id: 1, date: "2023-12-30", type: "credit", amount: 1000 },
  { id: 2, date: "2023-12-29", type: "debit", amount: 200 },
  { id: 3, date: "2023-12-28", type: "credit", amount: 1500 },
];
