import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Transcale from "../../components/TransitionScale";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchTransactions,
  fetchUserAccountDetails,
} from "../../features/Transactions/transactionSlice";
import { useEffect } from "react";
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const formatAmount = (amount: any) => {
    if (!amount) return "0.00";
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return "0.00";
    return parsedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUserAccountDetails());
  }, [dispatch]);

  // const handleFormSubmit = (
  //   values: FormValues,
  //   actions: FormikHelpers<FormValues>
  // ) => {
  //   console.log(values);
  //   actions.setSubmitting(false);
  // };

  if (transactions?.loading) return <p>Loading...</p>;
  if (transactions?.error) return <p>Error: {transactions?.error}</p>;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      flex: 1,
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Transaction Type",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {formatAmount(params.row.amount)}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  return (
    <Transcale>
      <Box m="20px">
        <Header
          title="TRANSACTION HISTORY"
          subtitle="List of all transactions history"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={Array.isArray(transactions?.data) ? transactions?.data : []}
            columns={columns}
          />
        </Box>
      </Box>
    </Transcale>
  );
};

export default Contacts;
