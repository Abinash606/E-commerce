import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";

const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 60%;
  margin: 5px 0;
`;

const TaxonLink = styled(Typography)`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  margin-bottom: 10px;
`;

const Image = styled("img")`
  width: 100%;
  max-width: 160px;
  height: auto;
  // border-radius: 8px;
  background-color: #f5f5f5;
`;

const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const fetchProductsWithImages = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v2/storefront/products?include=images"
    );
    const products = response.data.data;
    const includedImages = response.data.included || [];

    const productImages = products.map((item) => {
      const productImage = includedImages.find(
        (image) => image.id === item.relationships.images.data?.[0]?.id
      );
      return {
        name: item.attributes.name,
        imageUrl: productImage
          ? `http://localhost:3000${productImage.attributes.original_url}`
          : "",
      };
    });

    return productImages;
  } catch (error) {
    console.error("Error fetching product images:", error);
    toast.error("Failed to load images.");
    return [];
  }
};
function ShopBy() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchProductsWithImages();
      setImages(fetchedImages);
      setLoading(false);
    };

    loadImages();
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:960px)");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "60vh",
        boxSizing: "border-box",
        margin: "0 auto",
        padding: "20px",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          SHOP BY
        </Typography>
        <Line />
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#999" }} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexWrap={isSmallScreen ? "wrap" : "nowrap"}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box
            flex={isSmallScreen ? "1 1 100%" : "0 0 20%"}
            padding="10px"
            minWidth={isSmallScreen ? "100%" : "200px"}
            sx={{
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              marginBottom: isSmallScreen ? "20px" : "0",
            }}
          >
            <TaxonLink>New Arrivals</TaxonLink>
            <TaxonLink>Just In Last Week</TaxonLink>
            <TaxonLink>Trend inspirations</TaxonLink>
            <TaxonLink>Gifts for him</TaxonLink>
            <TaxonLink>Superbrands</TaxonLink>
            <TaxonLink>Clothing</TaxonLink>
            <TaxonLink>Bestsellers</TaxonLink>
            <TaxonLink>Luxury Streetwear</TaxonLink>
          </Box>

          {images.slice(0, 2).map((product, index) => (
            <Box
              key={index}
              flex={isSmallScreen ? "1 1 45%" : "0 0 35%"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                marginRight: isSmallScreen ? "0" : "20px",
                marginBottom: isSmallScreen ? "20px" : "0",
              }}
            >
              <ImageContainer>
                <Image src={product.imageUrl} alt={product.name} />
                <Typography variant="body1" mt={2} textAlign="center">
                  {product.name}
                </Typography>
              </ImageContainer>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ShopBy;
