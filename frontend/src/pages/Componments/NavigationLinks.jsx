import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Justin from "../Taxons/Justin";
import ShopBy from "../Taxons/ShopBy";
import Designers from "../Taxons/Designers";
import Clothing from "../Taxons/Clothing";
import Shoes from "../Taxons/Shoes";
import Accessories from "../Taxons/Accessories";
import Offers from "../Taxons/Offers";
import { useRouter } from "next/router";

const NavigationLinks = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const router = useRouter();

  const links = [
    "Just In",
    "Shop By",
    "Designers",
    "Clothing",
    "Shoes",
    "Accessories",
    "Offers",
  ];

  const handleClick = (text) => {
    switch (text) {
      case "Just In":
        router.push("/TaxonsComponments/JustinPage");
        break;
      case "Shop By":
        router.push("/TaxonsComponments/ShopByPage");
        break;
      case "Designers":
        router.push("/TaxonsComponments/DesignersPage");
        break;
      case "Clothing":
        router.push("/TaxonsComponments/ClothingPage");
        break;
      case "Shoes":
        router.push("/TaxonsComponments/ShoesPage");
        break;
      case "Accessories":
        router.push("/TaxonsComponments/AccessoriesPage");
        break;
      case "Offers":
        router.push("/TaxonsComponments/OffersPage");
        break;
      default:
        setVisibleSection("");
    }
  };

  return (
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          borderBottom: "1px solid #ddd",
          padding: 2,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {links.map((text, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              color: visibleSection === text ? "#000" : "#999",
              mx: 3,
              mb: 1,
              cursor: "pointer",
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "#000",
                fontWeight: "bold",
                transform: "translateY(-2px)",
              },
            }}
            onMouseEnter={() => setVisibleSection(text)}
            onMouseLeave={() => setVisibleSection("")}
            onClick={() => handleClick(text)}
          >
            {text}
          </Typography>
        ))}
      </Box>

      {links.map(
        (section) =>
          visibleSection === section && (
            <Box
              key={section}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 100,
                backgroundColor: "#fff",
                padding: 2,
                borderTop: "1px solid #ddd",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={() => setVisibleSection(section)}
              onMouseLeave={() => setVisibleSection("")}
            >
              {section === "Just In" && <Justin />}
              {section === "Shop By" && <ShopBy />}
              {section === "Designers" && <Designers />}
              {section === "Clothing" && <Clothing />}
              {section === "Shoes" && <Shoes />}
              {section === "Accessories" && <Accessories />}
              {section === "Offers" && <Offers />}
            </Box>
          )
      )}
    </Box>
  );
};

export default NavigationLinks;
