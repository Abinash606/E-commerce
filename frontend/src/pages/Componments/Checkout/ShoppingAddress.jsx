import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import Header from "../Header";
import Navbar from "../Navbar";
import TopFooter from "../TopFooter";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Line = styled(Box)`
  height: 1px;
  background-color: lightgray;
  width: 100%;
  margin: 16px 0;
`;

function ShoppingAddress() {
  const router = useRouter();
  const {
    firstname,
    lastname,
    address1,
    city,
    state_name,
    zipcode,
    phone,
    address_id,
  } = router.query;
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLineOne: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [addressId, setAddressId] = useState("");
  useEffect(() => {
    if (address_id) {
      setIsEditing(true);
      setAddressId(address_id);
    }
    setAddress({
      firstName: firstname || "",
      lastName: lastname || "",
      addressLineOne: address1 || "",
      city: city || "",
      stateProvince: state_name || "",
      postalCode: zipcode || "",
      phoneNumber: phone || "",
    });
  }, [
    firstname,
    lastname,
    address1,
    city,
    state_name,
    zipcode,
    phone,
    address_id,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleAddress = () => {
    router.push("/Componments/Checkout/ShippingOptions");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    const url = isEditing
      ? `http://localhost:3000/api/v2/storefront/account/addresses/${addressId}`
      : "http://localhost:3000/api/v2/storefront/account/addresses";
    const method = isEditing ? "PATCH" : "POST";
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        address: {
          firstname: address.firstName,
          lastname: address.lastName,
          address1: address.addressLineOne,
          city: address.city,
          phone: address.phoneNumber,
          zipcode: address.postalCode,
          state_name: address.stateProvince,
          country_iso: "US",
        },
      }),
    };

    console.log("Submitting address with options:", options);

    fetch(url, options)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        toast.success(
          isEditing
            ? "Address updated successfully!"
            : "Address saved successfully!"
        );
        setAddress({
          firstName: "",
          lastName: "",
          addressLineOne: "",
          city: "",
          stateProvince: "",
          postalCode: "",
          phoneNumber: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <Box>
      <Header />
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 200,
            marginLeft: { xs: 2, sm: 7 },
            color: "rgba(0, 0, 0, 0.9)",
            fontSize: 26,
          }}
        >
          Shipping Details
          <HomeIcon
            sx={{
              marginLeft: 1,
              fontSize: 30,
            }}
          />
        </Typography>
        <Line />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="addressLineOne"
                label="Address Line One"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.addressLineOne}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="City"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.stateProvince}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.postalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                required
                fullWidth
                sx={textFieldStyle}
                margin="normal"
                value={address.phoneNumber}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleAddress}
                  sx={{
                    width: "50%",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  {isEditing ? "Edit Address" : "Save Address"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <TopFooter />
      <Footer />
    </Box>
  );
}

export default ShoppingAddress;
