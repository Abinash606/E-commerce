/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { css } from "@emotion/react";
import Navbar from "../Navbar";
import NavigationLinks from "../NavigationLinks";
import Header from "../Header";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

const formContainerStyle = css`
  max-width: 360px;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const formFieldStyle = css`
  width: 100%;
  margin: 8px 0;
`;

const lineStyle = css`
  width: calc(100% - 32px); /* Adjust width to match form container */
  height: 1px;
  background-color: #ddd;
  margin: 16px auto; /* Center the line and add margin */
`;

const buttonStyle2 = css`
  width: 100%;
  max-width: 200px;
  min-width: 150px;
  margin: 20px auto;
  background-color: black;
  color: white;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
  }
  &:active {
    background-color: black;
    color: white;
  }
`;

const textFieldStyle = {
  "& .MuiInputBase-root": {
    borderColor: "gray !important",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "gray !important",
  },
  "& .MuiInputLabel-root": {
    color: "gray !important",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "gray !important",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "gray !important",
  },
};

function Yourorder() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <Navbar />
      <Box mb={4}>
        <NavigationLinks />
      </Box>

      <Box css={formContainerStyle}>
        <Typography
          gutterBottom
          align="left"
          sx={{
            fontWeight: 400,
            mt: 1,
            color: "rgba(0, 0, 0, 0.9)",
          }}
        >
          Track Your Order
        </Typography>

        <Box css={lineStyle} />

        <Typography
          variant="body1"
          paragraph
          align="center"
          sx={{
            fontWeight: 200,
            mt: 1,
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          Enter your order number and email address in the boxes below to review
          your purchase and view its delivery status. If you’ve just placed an
          order, it will take a few minutes to update.
        </Typography>
        <TextField
          css={formFieldStyle}
          margin="normal"
          label="Email"
          variant="outlined"
          required
          sx={textFieldStyle}
        />
        <TextField
          css={formFieldStyle}
          margin="normal"
          label="Order Number"
          variant="outlined"
          required
          sx={textFieldStyle}
        />

        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" css={buttonStyle2} fullWidth>
            Track
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        {" "}
        <TopFooter />
      </Box>

      <Footer />
    </Box>
  );
}

export default Yourorder;
