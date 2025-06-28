import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Styled components
const Wrapper = styled(Box)`
  background-color: #f2f2f2;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  transition: background-color 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 600px) {
    padding: 8px 16px;
  }
`;

const LeftSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    font-size: 16px;
    color: #666;
    margin-left: 8px;
  }

  @media (max-width: 600px) {
    display: none; /* Hide on small screens */
  }
`;

const RightSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    display: none; /* Hide on small screens */
  }
`;

const StyledTypography = styled(Typography)`
  font-family: "Outnet WebXL", sans-serif;
  font-weight: 200;
  &:hover {
    text-decoration: underline;
  }
`;

const DrawerContent = styled(List)`
  padding: 20px;
`;

function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Only run on client-side
    const storedEmail =
      typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
    setUserEmail(storedEmail);
  }, []);

  const formatNameFromEmail = (email) => {
    const namePart = email.split("@")[0];
    return namePart
      .split(/[\.\_\-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSignInClick = () => {
    if (!userEmail) {
      router.push("/Componments/Auth/Login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null); // Update state to reflect logout immediately
    router.push("/Componments/Auth/Login");
  };

  const formattedName = userEmail ? formatNameFromEmail(userEmail) : null;

  const handleTrackOrder = () => {
    router.push("/Componments/Nav/Yourorder");
  };

  const createReturn = () => {
    router.push("/Componments/Nav/Createreturn");
  };

  const handleCustomerCare = () => {
    router.push("/Componments/Nav/Customer");
  };

  const handleReturn = () => {
    router.push("/Componments/Nav/Return");
  };
  const handleDelivery = () => {
    router.push("/Componments/Checkout/ShoppingAddress");
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Wrapper>
        <LeftSection>
          <Box display="flex" alignItems="center">
            {userEmail ? (
              <Tooltip title="Logout" arrow>
                <Box
                  onClick={handleLogout}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="body1">
                    Welcome, {formattedName}
                  </Typography>
                </Box>
              </Tooltip>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                onClick={handleSignInClick}
                style={{ cursor: "pointer" }}
              >
                <PersonIcon sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 200 }}>
                  Sign In
                </Typography>
              </Box>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <img
              src="https://logowik.com/content/uploads/images/usa-flag1728.jpg"
              alt="USA Flag"
              style={{ width: 24, height: 24, borderRadius: "50%" }}
            />
            <Typography variant="body1" sx={{ ml: 1, fontWeight: 200 }}>
              United States
            </Typography>
          </Box>
        </LeftSection>
        <RightSection>
          <StyledTypography component="span" ml={2} onClick={handleTrackOrder}>
            Track Your Order |
          </StyledTypography>
          <StyledTypography component="span" ml={1} onClick={createReturn}>
            Create A Return |
          </StyledTypography>
          <StyledTypography
            component="span"
            ml={1}
            onClick={handleCustomerCare}
          >
            Customer Care |
          </StyledTypography>
          <StyledTypography component="span" ml={1} onClick={handleDelivery}>
            Delivery |
          </StyledTypography>
          <StyledTypography component="span" ml={1} onClick={handleReturn}>
            Returns
          </StyledTypography>
        </RightSection>
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Wrapper>

      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <Box display="flex" justifyContent="flex-end" padding={2}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DrawerContent>
          <ListItem button onClick={handleSignInClick}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button onClick={handleTrackOrder}>
            <ListItemText primary="Track Your Order" />
          </ListItem>
          <ListItem button onClick={createReturn}>
            <ListItemText primary="Create A Return" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Customer Care" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Delivery" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Returns" />
          </ListItem>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
