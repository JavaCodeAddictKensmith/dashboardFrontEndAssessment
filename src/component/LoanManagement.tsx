import React, { useEffect, useState } from "react";
import { fetchLoanData } from "../api/mockApi";

const LoanManagement: React.FC = () => {
  const [loanData, setLoanData] = useState<any>(null);
  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    purpose: "",
  });

  useEffect(() => {
    fetchLoanData().then(setLoanData);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Request Loan:", formData);
  };

  if (!loanData) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">Loan Management</h2>
      <h3 className="font-semibold">Active Loan:</h3>
      <p>Amount: ${loanData.activeLoan.amount}</p>
      <p>Tenure: {loanData.activeLoan.tenure}</p>
      <p>Purpose: {loanData.activeLoan.purpose}</p>

      <h3 className="font-semibold mt-4">Loan History:</h3>
      <ul className="list-disc pl-5">
        {loanData.history.map((loan: any) => (
          <li key={loan.id}>
            ${loan.amount} - {loan.tenure} - {loan.purpose} - {loan.status}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Request New Loan:</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="tenure"
          value={formData.tenure}
          onChange={handleInputChange}
          placeholder="Tenure"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          placeholder="Purpose"
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Request Loan
        </button>
      </form>
    </div>
  );
};

export default LoanManagement;
