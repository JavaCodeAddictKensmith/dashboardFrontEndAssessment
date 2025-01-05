import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";

import { tokens } from "../../theme";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchUserLoanHistory,
  fetchUserLoanHisDetails,
} from "../../features/Transactions/transactionSlice";
import { Formik, FormikHelpers } from "formik";
import { useEffect } from "react";

import * as yup from "yup";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
}

const Team: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch<AppDispatch>();
  const { loanHistory, loanHisDetails } = useSelector(
    (state: RootState) => state.transactions
  );
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

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().required("required"),
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

  if (loanHistory?.loading) return <p>Loading...</p>;
  if (loanHistory?.error) return <p>Error: {loanHistory?.error}</p>;

  return (
    <Box mb="30px">
      <Box
        // display="flex"
        // flexDirection={{ xs: "column", md: "row" }}
        // justifyContent="space-between"
        // alignItems="flex-start"
        gap={3}
        px={3}
        pb={3}
      >
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
                  <strong>Loan Amount:</strong>$
                  {formatAmount(loanHisDetails?.data[0]?.amount)} <br />
                  <strong>Loan Interest:</strong>{" "}
                  {formatAmount(loanHisDetails?.data[0]?.interest)} <br />
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
                  <Button type="submit" color="secondary" variant="contained">
                    Request a Loan
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        {/* Loan History Section */}
        <Box
          flex={1}
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="8px"
          boxShadow={3}
          p={2}
          mt={6}
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
              <Box color={colors.grey[100]}>{transaction.duration} months</Box>
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
      </Box>
    </Box>
  );
};

export default Team;
