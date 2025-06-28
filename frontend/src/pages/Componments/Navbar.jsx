import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Navbar() {
  const router = useRouter();
  const itemCount = useSelector((state) => state.cart.itemCount);
  const handleHome = () => {
    router.push("/");
  };
  const handelBag = () => {
    router.push("/Componments/Checkout/CartOne");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ borderBottom: "1px solid #ddd", marginTop: "60px", width: "100%" }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        sx={{
          maxWidth: "1200px",
          width: "100%",
          gap: 2,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexShrink={0}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "500" }}>
            Women
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", fontWeight: "bold", mx: 1 }}
          >
            |
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "500" }}>
            Men
          </Typography>
        </Box>

        {/* Center: Photo */}
        <Box
          display="flex"
          justifyContent="center"
          flexGrow={1}
          sx={{
            textAlign: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
          onClick={handleHome}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFdn5sjKUFecXsSZLoiRDwJtSyTHXa4674lw&s"
            alt="Logo"
            style={{
              height: "24px",
              width: "auto",
              cursor: "pointer",
            }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexShrink={0}
          flexDirection={{ xs: "row", sm: "row" }}
          sx={{ fontSize: "14px" }}
        >
          <IconButton sx={{ fontSize: "24px" }}>
            <SearchIcon />
          </IconButton>
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            Search
          </Typography>
          <Typography variant="body2" sx={{ mx: 1, fontSize: "14px" }}>
            |
          </Typography>
          <IconButton sx={{ fontSize: "24px" }}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton sx={{ fontSize: "24px" }} onClick={handelBag}>
            <Badge
              badgeContent={itemCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "gray",
                  color: "white",
                },
              }}
            >
              <LocalMallIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
