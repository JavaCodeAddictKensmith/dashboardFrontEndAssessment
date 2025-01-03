import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api/mockApi";

const UserOverview: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserData().then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-4">User Overview</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Account Balance:</strong> ${user.balance.toFixed(2)}
      </p>
      <h3 className="font-semibold mt-4">Recent Transactions:</h3>
      <ul className="list-disc pl-5">
        {user.recentTransactions.map((txn: any) => (
          <li key={txn.id}>
            {txn.date} - {txn.type} - ${txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOverview;
