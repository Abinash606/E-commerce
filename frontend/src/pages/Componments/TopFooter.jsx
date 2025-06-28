import React from "react";
import { RiVisaFill } from "react-icons/ri";
import { LiaCcMastercard } from "react-icons/lia";
import { FaFacebook, FaInstagram, FaYoutube, FaStripe } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
// Styled components
const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 100%;
  margin-bottom: 20px;
`;

const FooterWrapper = styled(Box)`
  background-color: #f9f9f9;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  gap: 20px;
  justify-content: space-between;
`;

const LeftSection = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const RightSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 600px) {
    flex-direction: column;
  }
`;

const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

const FooterLink = styled(Typography)`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled(Box)`
  display: flex;
  gap: 15px;
  svg {
    font-size: 22px;
    color: #333;
    transition: color 0.3s ease;
    &:hover {
      color: #000;
    }
  }
`;

const SubscriptionBox = styled(Box)`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SubscriptionInput = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
  .MuiInputBase-root {
    border-radius: 8px;
    transition: border-color 0.3s ease;
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: gray;
      }
    }
  }
  .MuiOutlinedInput-root {
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: gray;
    }
  }
`;

const SubscribeButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  &:hover {
    background-color: #333;
  }
`;

const TopFooter = () => {
  const route = useRouter();
  return (
    <>
      <Line />
      <FooterWrapper>
        <LeftSection>
          <Section>
            <FooterTitle>Help and Information</FooterTitle>
            <FooterLink>About us</FooterLink>
            <FooterLink>Affiliates</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>Contact Us</FooterLink>
            <FooterLink>Help</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
          </Section>
          <Section>
            <FooterTitle>Customer Service</FooterTitle>
            <FooterLink>Payment</FooterLink>
            <FooterLink>Delivery</FooterLink>
            <FooterLink>Returns</FooterLink>
            <FooterLink>Terms & Conditions</FooterLink>
            <FooterLink
              onClick={() =>
                route.push("/Componments/Checkout/ShippingOptions")
              }
            >
              Shipping
            </FooterLink>
            <FooterLink>Refunds</FooterLink>
          </Section>
          <Section>
            <FooterTitle>Payment Methods</FooterTitle>
            <Box display="flex" gap={2}>
              <RiVisaFill style={{ fontSize: "24px" }} />
              <LiaCcMastercard style={{ fontSize: "24px" }} />
              <FaStripe style={{ fontSize: "24px" }} />
            </Box>
          </Section>
          <Box textAlign="center" gap={2}>
            <FooterTitle>Stay Social</FooterTitle>
            <SocialIcons>
              <FaFacebook />
              <FaInstagram />
              <BsTwitterX />
              <FaYoutube />
            </SocialIcons>
          </Box>
        </LeftSection>
        <RightSection>
          <SubscriptionBox>
            <Typography variant="h6" gutterBottom>
              Want to stay stylishly in the know?
            </Typography>
            <Typography variant="body2" paragraph>
              Subscribe to THE OUTNET to receive an extra 15% off your next
              order! You'll also be the first to know about our exclusive new
              arrivals, latest trends, and upcoming promotions.
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <SubscriptionInput
                variant="outlined"
                placeholder="Email Address"
                size="small"
              />
              <SubscribeButton variant="contained">Subscribe</SubscribeButton>
            </Box>
            <Typography variant="body2" mt={2}>
              By subscribing, you agree to receive promotional emails and
              updates from THE OUTNET.
            </Typography>
          </SubscriptionBox>
        </RightSection>
      </FooterWrapper>
    </>
  );
};

export default TopFooter;
