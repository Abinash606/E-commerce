import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  CircularProgress,
} from "@mui/material";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { setSelectedAddress } from "../../redux/checkoutSlice";
import axios from "axios";
import { useRouter } from "next/router";
function ShippingOptions() {
  const [selectedOption, setSelectedOption] = useState("express");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };
  const handleEditAddress = (address) => {
    router.push({
      pathname: "/Componments/Checkout/ShoppingAddress",
      query: {
        firstname: address.attributes.firstname,
        lastname: address.attributes.lastname,
        address1: address.attributes.address1,
        city: address.attributes.city,
        state_name: address.attributes.state_name,
        zipcode: address.attributes.zipcode,
        phone: address.attributes.phone,
        address_id: address.id,
      },
    });
  };
  useEffect(() => {
    // Function to fetch shipping addresses
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/v2/storefront/account/addresses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddresses(response.data.data);
      } catch (error) {
        setError("Failed to fetch addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);
  const handleContinue = async () => {
    const cartToken = localStorage.getItem("cartToken");
    const shippingMethodId = selectedOption === "express" ? 2 : 1;
    if (!selectedAddressId) {
      router.push("/Componments/Checkout/ShoppingAddress");

      return;
    }
    try {
      const response1 = await fetch(
        "http://localhost:3000/api/v2/storefront/checkout/select_shipping_method",
        {
          method: "PATCH",
          headers: {
            "X-Spree-Order-Token": cartToken,
            "Content-Type": "application/vnd.api+json",
          },
          body: JSON.stringify({
            shipping_method_id: shippingMethodId,
            address_id: selectedAddressId,
          }),
        }
      );
      if (!response1.ok) {
        throw new Error("Failed to select shipping method");
      }
      dispatch(
        setSelectedAddress(
          addresses.find((address) => address.id === selectedAddressId)
        )
      );
      const data = await response1.json();
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
    router.push("/Componments/Checkout/PaymentOption");
  };
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress sx={{ color: "gray" }} />
          <Typography sx={{ marginLeft: 2 }}>Loading...</Typography>
        </Box>
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Header />
      <Navbar />
      <Box sx={{ padding: "16px" }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "200",
            marginBottom: "16px",
            fontSize: "18px",
            color: "rgba(0, 0, 0, 0.9)",
            marginLeft: 6,
          }}
        >
          Shipping Details
        </Typography>
        <hr />
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <Box
              key={address.id}
              onClick={() => handleAddressSelect(address.id)}
              sx={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                backgroundColor:
                  selectedAddressId === address.id ? "#e0e0e0" : "transparent",
                ":hover": {
                  backgroundColor:
                    selectedAddressId === address.id ? "#d0d0d0" : "#f0f0f0",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                  marginTop: 2,
                }}
              >
                SHIP TO
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "2px",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                }}
              >
                {address.attributes.firstname} {address.attributes.lastname}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "2px",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                }}
              >
                {address.attributes.address1} {address.attributes.address2}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "2px",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                }}
              >
                {address.attributes.city}, {address.attributes.state_name}{" "}
                {address.attributes.zipcode}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "2px",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                }}
              >
                {address.attributes.country_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  marginTop: "15px",
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, 0.9)",
                  marginLeft: 6,
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => handleEditAddress(address)}
              >
                Edit
              </Typography>
              <hr style={{ margin: "16px 0" }} />
            </Box>
          ))
        ) : (
          <Typography>No addresses found</Typography>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "200",
            marginBottom: "16px",
            fontSize: "18px",
            color: "rgba(0, 0, 0, 0.9)",
            marginLeft: 6,
          }}
        >
          Shipping Options
        </Typography>
        <hr />
        {/* Express Shipping Option */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "16px",
            flexWrap: "wrap",
            marginLeft: 4,
          }}
        >
          <Radio
            checked={selectedOption === "express"}
            onChange={handleOptionChange}
            value="express"
            name="shipping-option"
            color="default"
            sx={{ marginRight: 2 }}
          />
          <Box sx={{ flex: 1, marginTop: "6px" }}>
            <Typography
              variant="body1"
              sx={{
                display: "inline",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.9)",
              }}
            >
              FREE
            </Typography>
            <Typography variant="body2">
              Delivery between 9am-5pm, Monday to Friday
            </Typography>
          </Box>
        </Box>
        {/* COD Shipping Option */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "16px",
            flexWrap: "wrap",
            marginLeft: 4,
          }}
        >
          <Radio
            checked={selectedOption === "cod"}
            onChange={handleOptionChange}
            value="cod"
            name="shipping-option"
            color="default"
            sx={{ marginRight: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                display: "inline",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.9)",
              }}
            >
              Express Shipping
            </Typography>
            <Typography variant="body2">
              Delivery between One to Two Days
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleContinue}
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "50%",
              ":hover": {
                backgroundColor: "#333",
                color: "white",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ShippingOptions;
