import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Line = styled(Box)`
  height: 1px;
  background-color: #ddd;
  width: 60%;
  margin-bottom: 10px;
`;

const TaxonLink = styled(Typography)`
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Image = styled("img")`
  width: 200px;
  height: auto;
  margin-right: 10px;
  // border-radius: 4px;
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

function Justin() {
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
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={2}
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
        flex="1 1 22%"
        padding="10px"
        minWidth="200px"
        sx={{
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Just In
        </Typography>
        <Line />
        <TaxonLink>New Arrivals</TaxonLink>
        <TaxonLink>Just In Last Week</TaxonLink>
        <TaxonLink>Trend inspirations</TaxonLink>
      </Box>

      <Box
        flex="1 1 22%"
        padding="10px"
        minWidth="200px"
        sx={{
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Typography variant="body1" color="text.secondary">
          DESIGNERS
        </Typography>
        <Line />
        <TaxonLink>Jacquemus</TaxonLink>
        <TaxonLink>Le 17 Septembre</TaxonLink>
        <TaxonLink>Officine Générale</TaxonLink>
      </Box>

      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress sx={{ color: "#999" }} />
        </Box>
      ) : (
        images.slice(0, 2).map((product, index) => (
          <Box
            key={index}
            flex="1 1 22%"
            padding="10px"
            minWidth="200px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              borderRadius: "4px",
              marginBottom: "20px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <Image src={product.imageUrl} alt={product.name} />
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {product.name}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}

export default Justin;
