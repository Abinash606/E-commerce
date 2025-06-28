import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const Line = styled(Box)`
  height: 1px;
  background-color: #ddd; /* Light grey color for the line */
  width: 100%;
  margin-bottom: 20px; /* Space between the line and the footer content */
`;

const FooterText = styled(Typography)`
  font-size: 14px; /* Base font size */
  color: #666;
  margin: 0 16px; /* Add horizontal margin */
  @media (max-width: 600px) {
    font-size: 12px; /* Smaller font size for mobile screens */
    margin: 0 8px; /* Smaller horizontal margin */
  }
`;

function Footer() {
  return (
    <Box textAlign="center" py={2} /* Add vertical padding */>
      <Line />
      <FooterText variant="body2" paragraph>
        © 2009 - 2024 THE OUTNET, part of YOOX NET-A-PORTER GROUP. The
        individuals featured on this site do not endorse THE OUTNET or the
        products shown.
      </FooterText>
    </Box>
  );
}

export default Footer;
