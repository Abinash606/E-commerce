import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import NavigationLinks from "../NavigationLinks";
import Header from "../Header";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

function Return() {
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
          You have 28 days from receiving your order to:
        </Typography>
        <List
          sx={{
            padding: 0,
            margin: 0,
            listStyleType: "disc",
            textAlign: "left",
          }}
        >
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Create your return here or if you are registered with THE
                  OUTNET, by logging into your account.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Take your return to your nearest drop off point or book your
                  collection.
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1">
                  To avoid delays, please do not combine returns from separate
                  orders.
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>

      <TopFooter />
      <Footer />
    </Box>
  );
}

export default Return;
