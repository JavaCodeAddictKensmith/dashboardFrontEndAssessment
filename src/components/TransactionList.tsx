import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchTransactions } from "../features/Transactions/transactionSlice";

const TransactionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //   console.log("------data", data);
  //   console.log("------err", error);

  return (
    <div>
      <h1>Transaction List</h1>
      <ul>
        {data?.length > 0 &&
          data?.map((transaction) => (
            <li key={transaction.id}>
              <p>
                <strong>{transaction.name}</strong> - {transaction.amount}{" "}
                {transaction.currency}
              </p>
              <p>
                Type: {transaction.type} | Status: {transaction.status} | Date:{" "}
                {transaction.createdAt}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TransactionList;
