import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import LineChart from "../../components/LineChart";

import StatBox from "../../components/StatBox";
import Transcale from "../../components/TransitionScale";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchTransactions,
  fetchUserAccountDetails,
  fetchUserLoanHistory,
  fetchUserLoanHisDetails,
} from "../../features/Transactions/transactionSlice";
import { useEffect } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch<AppDispatch>();
  const { transactions, userAccounts, loanHistory, loanHisDetails } =
    useSelector((state: RootState) => state.transactions);
  const formatAmount = (amount) => {
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

  useEffect(() => {
    dispatch(fetchUserLoanHistory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserLoanHisDetails());
  }, [dispatch]);

  const handleFormSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

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

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };
  return (
    <Transcale>
      <Box m="20px" pb={3}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Overview" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}

        <Box
          // gridTemplateColumns="repeat(12, 1fr)"
          // gridAutoRows="full"
          gap="30px"
        >
          {/* ROW 1 */}

          <Transcale
            // gridColumn="span 1"
            // backgroundColor=
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={` min-w-[400px] md:min-h-[400px]  ${colors.primary[400]}`}
          >
            <Transcale className={" w-full md:min-h-[400px]  bg-red-800 "}>
              <h2> {userAccounts?.data[0]?.name}</h2>
            </Transcale>
            <StatBox
              title={`${userAccounts?.data[0]?.AccountBalance}`}
              subtitle="Account Balance"
              progress="0.80"
              increase="+43%"
              // icon={
              //   <TrafficIcon
              //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              //   />
              // }
            />
          </Transcale>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  ${userAccounts?.data[0]?.revenue}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {transactions?.data?.length > 0 &&
              transactions?.data?.slice(0, 5).map((transaction, i) => (
                <Box
                  key={`${transaction.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.invoiceNumber}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.name}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.currency}</Box>
                  <Box color={colors.grey[100]}>{transaction.createdAt}</Box>
                  <Box color={colors.grey[100]}>{transaction.type}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {formatAmount(transaction.amount)}
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.status}</Box>
                </Box>
              ))}
          </Box>

          {/* ROW 3 */}

          {/* new section */}

          <Box mb="30px">
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Loan Management
            </Typography>

            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="flex-start"
              gap={3}
            >
              {/* Loan History Section */}
              <Box
                flex={1}
                backgroundColor={colors.primary[400]}
                overflow="auto"
                borderRadius="8px"
                boxShadow={3}
                p={2}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                  mb={2}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  pb={1}
                >
                  Loan History
                </Typography>

                {loanHistory?.data?.map((transaction, i) => (
                  <Box
                    key={`${transaction.id}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`2px solid ${colors.primary[500]}`}
                    p={2}
                  >
                    {/*
                      {
        "transactionDate": "23-10-2024",
        "dueDate": "12-12-2024",
        "interest": "1000000",
        "duration": "6",
        "status": "Paid",
        "issuer": "Sterling",
        "amount": "1000000",
        "purpose": "Purchase",
        "id": "1"
    },
                    
                    */}
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h6"
                        fontWeight="600"
                      >
                        {transaction.transactionDate}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {transaction.dueDate}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>
                      {transaction.duration} months
                    </Box>
                    <Box
                      // backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                      // color={colors.grey[100]}
                    >
                      {transaction.issuer}
                    </Box>
                    <Box
                      p="5px 10px"
                      borderRadius="4px"
                      // color={colors.grey[100]}
                    >
                      {transaction.amount}
                    </Box>
                    <Box
                      p="5px 10px"
                      borderRadius="4px"
                      // color={colors.grey[100]}
                    >
                      {transaction.interest}
                    </Box>
                    <Box
                      p="5px 10px"
                      borderRadius="4px"
                      // color={colors.grey[100]}
                    >
                      {transaction.status}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Active Loan Details Section */}
              <Box
                flex={1}
                backgroundColor={colors.primary[400]}
                borderRadius="8px"
                boxShadow={3}
                p={2}
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                  mb={2}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  pb={1}
                >
                  Active Loan Details
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap={3}
                >
                  {" "}
                  <Typography
                    color={colors.grey[100]}
                    sx={{
                      fontStyle: "italic", // Makes text italic
                      fontSize: "1.2rem", // Adjust font size (can use 'px', 'rem', etc.)
                      fontWeight: 600, // Increases font weight
                      lineHeight: 1.6, // Optional: Improves readability with line spacing
                    }}
                  >
                    {/* Render active loan details dynamically */}
                    {loanHisDetails?.data ? (
                      <>
                        <strong>Loan Amount:</strong> $
                        {loanHisDetails?.data[0]?.amount} <br />
                        <strong>Interest Rate:</strong>{" "}
                        {loanHisDetails?.data[0]?.interest} <br />
                        <strong>Tenure:</strong>
                        {loanHisDetails?.data[0]?.duration} months
                        <br />
                        <strong>Date:</strong>
                        {loanHisDetails?.data[0]?.transactionDate}
                      </>
                    ) : (
                      "No active loan details available."
                    )}
                  </Typography>{" "}
                  <Typography
                    color={colors.grey[100]}
                    sx={{
                      fontStyle: "italic", // Makes text italic
                      fontSize: "1.2rem", // Adjust font size (can use 'px', 'rem', etc.)
                      fontWeight: 600, // Increases font weight
                      lineHeight: 1.6, // Optional: Improves readability with line spacing
                    }}
                  >
                    {/* Render active loan details dynamically */}
                    {loanHisDetails?.data.length > 0 ? (
                      <>
                        <strong>Due Date:</strong>
                        {loanHisDetails?.data[0]?.dueDate} <br />
                        <strong>Loan Issuer:</strong>{" "}
                        {loanHisDetails?.data[0]?.issuer} <br />
                        <strong>Satus:</strong>
                        {loanHisDetails?.data[0]?.status}
                        <br />
                        <strong>Purpose :</strong>
                        {loanHisDetails?.data[0]?.purpose}
                      </>
                    ) : (
                      "No active loan details available."
                    )}
                  </Typography>
                </Box>

                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        mt={"20px"}
                        sx={{
                          "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4",
                          },
                        }}
                      >
                        {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={!!touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: "span 2" }}
                      /> */}
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Terms"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                          mt="20px"
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Amount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contact}
                          name="contact"
                          error={!!touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Purpose of the loan"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address1}
                          name="address1"
                          error={!!touched.address1 && !!errors.address1}
                          helperText={touched.address1 && errors.address1}
                          sx={{ gridColumn: "span 4" }}
                          multiline
                        />
                      </Box>
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                        >
                          Request a Loan
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>

          {/* Loansection commented out */}

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
                rows={
                  Array.isArray(transactions?.data) ? transactions?.data : []
                }
                columns={columns}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Transcale>
  );
};

export default Dashboard;
