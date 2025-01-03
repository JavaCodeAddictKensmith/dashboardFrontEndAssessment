import React, { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../api/mockApi";

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTransactionHistory().then(setTransactions);
  }, []);

  const filteredTransactions = transactions.filter((txn) =>
    filter === "all" ? true : txn.type === filter
  );

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="all">All</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((txn) => (
            <tr key={txn.id}>
              <td className="border p-2">{txn.date}</td>
              <td className="border p-2">{txn.type}</td>
              <td className="border p-2">${txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
