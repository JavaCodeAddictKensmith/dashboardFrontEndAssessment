import React from "react";
import UserOverview from "./UserOverview";
import LoanManagement from "./LoanManagement";
import TransactionHistory from "./TransactionHistory";

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <UserOverview />
      <LoanManagement />
      <div className="col-span-1 md:col-span-2">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
