import React from "react";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import NavigationLinks from "./NavigationLinks.jsx";
import ProductCarousel from "./ProductCarousel.jsx";
import Banner from "./Banner.jsx";
import Product from "./Product.jsx";
import TopFooter from "./TopFooter.jsx";
import Footer from "./Footer.jsx";
import { Box } from "@mui/material";
function Client() {
  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <ProductCarousel />
      <Banner />
      <Product />
      <TopFooter />
      <Footer />
    </Box>
  );
}

export default Client;
