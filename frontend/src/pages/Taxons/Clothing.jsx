import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, styled, CircularProgress } from "@mui/material";

const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 36%;
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
  max-width: 150px;
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
function Clothing() {
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
  return (
    <Box sx={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#999", textAlign: "left", marginBottom: "10px" }}
          >
            CLOTHING
          </Typography>
          <Line />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ flex: "0 0 40%", padding: "10px" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ flex: "0 0 50%", padding: "10px" }}>
              <TaxonLink>All Clothing</TaxonLink>
              <TaxonLink>Just In Clothing</TaxonLink>
              <TaxonLink>Casual Shirts</TaxonLink>
              <TaxonLink>Tops & T-Shirts</TaxonLink>
              <TaxonLink>Polo Shirts</TaxonLink>
            </Box>
            <Box sx={{ flex: "0 0 50%", padding: "10px" }}>
              <TaxonLink>Coats</TaxonLink>
              <TaxonLink>Casual Pants</TaxonLink>
              <TaxonLink>Formal Pants</TaxonLink>
              <TaxonLink>Blazers</TaxonLink>
              <TaxonLink>Jeans</TaxonLink>
            </Box>
          </Box>
        </Box>
        {loading ? (
          <Box
            sx={{
              flex: "0 0 60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#999" }} />
          </Box>
        ) : (
          images.slice(1, 4).map((product, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageContainer>
                <Image src={product.imageUrl} alt={product.name} />
                <Typography variant="body1" mt={2} textAlign="center">
                  {product.name}
                </Typography>
              </ImageContainer>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Clothing;
