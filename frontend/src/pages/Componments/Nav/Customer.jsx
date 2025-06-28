import { Typography, Box } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import NavigationLinks from "../NavigationLinks";
import Header from "../Header";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

function Customer() {
  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Don't hesitate to get in touch! We're available 24 hours a day, seven
          days a week.
        </Typography>
        <Typography variant="body1" paragraph>
          <span className="font-bold">Contact us via LiveChat:</span> find us in
          the bottom right hand corner of the screen when we're available to
          chat
        </Typography>
        <Typography variant="body1" paragraph>
          <span className="font-bold">Email us at:</span>{" "}
          <a href="mailto:customercare@theoutnet.com" className="underline">
            customercare@theoutnet.com
          </a>
        </Typography>
        <Typography variant="body1" paragraph>
          <span className="font-bold">Call us on:</span>{" "}
          <a href="tel:+18889688638" className="underline">
            +1 888 9 688638
          </a>
        </Typography>
      </Box>

      <TopFooter />
      <Footer />
    </Box>
  );
}

export default Customer;
