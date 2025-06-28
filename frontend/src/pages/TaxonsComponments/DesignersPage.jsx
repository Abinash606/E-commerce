import React from "react";
import { Box, Typography, styled, Grid } from "@mui/material";
import Header from "../Componments/Header";
import Navbar from "../Componments/Navbar";
import NavigationLinks from "../Componments/NavigationLinks";
import Footer from "../Componments/Footer";

const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 90%;
  margin: 5px auto;
`;

const AlphabetNav = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const AlphabetLink = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  margin: 0 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DesignerSection = styled(Box)`
  margin: 30px 0;
  padding: 10px;
  text-align: center;
`;

function DesignersPage() {
  const alphabets = ["0-9", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const designers = {
    "0-9": ["1017ALYX9SM", "120% Lino"],
    A: ["A Bathing Ape", "Acronym", "Adidas Originals by Wales Bonner"],
    B: ["Balenciaga", "Barbour", "Boglioli"],
    C: ["Celine", "Chanel", "Chloe"],
    D: ["Derek Rose", "Dolce & Gabbana"],
    E: ["Everlane", "Elizabeth Arden", "Everlane"],
    F: ["Fendi", "Forever 21", "Forever 21"],
    G: ["Gucci", "Gucci"],
    H: ["H&M", "H&M"],
    I: ["IKEA", "IKEA"],
    J: ["J.Crew", "J.Crew"],
    K: ["Kate Spade", "Kate Spade"],
    L: ["Louis Vuitton", "Louis Vuitton"],
    M: ["Marc Jacobs", "Marc Jacobs"],
    N: ["Nine West", "Nine West"],
    O: ["Old Navy", "Old Navy"],
    P: ["Patagonia", "Patagonia"],
    Q: ["Quiksilver", "Quiksilver"],
    R: ["Ralph Lauren", "Ralph Lauren"],
    S: ["Saint Laurent", "Saint Laurent"],
    T: ["Tory Burch", "Tory Burch"],
    U: ["Under Armour", "Under Armour"],
    V: ["Vans", "Vans"],
    W: ["Wildcraft", "Wildcraft"],
    X: ["X", "X"],
    Y: ["Yves Saint Laurent", "Yves Saint Laurent"],
    Z: ["Zara", "Zara"],
  };

  const sectionRefs = alphabets.reduce((acc, letter) => {
    acc[letter] = React.createRef();
    return acc;
  }, {});

  const handleScroll = (letter) => {
    if (sectionRefs[letter].current) {
      sectionRefs[letter].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: 20, md: 26 },
            marginLeft: { xs: 2, md: 10 },
            marginTop: 2,
          }}
        >
          Designers
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "500",
              marginRight: 1,
            }}
          >
            Women
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "bold",
              marginX: 1,
            }}
          ></Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: "500",
            }}
          >
            Men
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Line />
      </Box>

      <AlphabetNav>
        {alphabets.map((letter) => (
          <AlphabetLink
            key={letter}
            onClick={() => handleScroll(letter)}
            sx={{
              fontSize: { xs: 20, md: 24 },
            }}
          >
            {letter}
          </AlphabetLink>
        ))}
      </AlphabetNav>

      <Box sx={{ marginTop: 2 }}>
        <Line />
      </Box>

      {Object.entries(designers).map(([letter, designerList]) => (
        <DesignerSection key={letter} ref={sectionRefs[letter]}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, md: 39 },
              fontWeight: "bold",
            }}
          >
            {letter}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", marginTop: 1 }}
          >
            {designerList.map((designer) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={designer}
                sx={{ textAlign: "center" }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 16, md: 18 },
                    fontWeight: "400",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: { xs: 18, md: 20 },
                      color: "gray",
                    }}
                  >
                    {designer.charAt(0)}
                  </span>
                  {designer.slice(1).toUpperCase()}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </DesignerSection>
      ))}

      <Footer />
    </Box>
  );
}

export default DesignersPage;
