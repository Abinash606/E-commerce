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
  margin-bottom: 5px;
`;

const Image = styled("img")`
  width: 100%;
  max-width: 160px;
  height: auto;
  // border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
`;

const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const MainContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
`;

const SectionContainer = styled(Box)`
  flex: 1;
  min-width: 200px;
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

function Offers() {
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
  const dynamicImage = images.length > 0 ? images[0].imageUrl : "";
  return (
    <MainContainer>
      <SectionContainer>
        <Typography variant="h6">70% OFF</Typography>
        <Line />
        <TaxonLink>All Styles at 70% Off</TaxonLink>
        <TaxonLink>Clothing</TaxonLink>
        <TaxonLink>Casual Shirts</TaxonLink>
        <TaxonLink>Tops & T-Shirts</TaxonLink>
        <TaxonLink>Jackets</TaxonLink>
        <TaxonLink>Pants</TaxonLink>
      </SectionContainer>

      <SectionContainer>
        <Typography variant="h6">DESIGNERS</Typography>
        <Line />
        <TaxonLink>Frame</TaxonLink>
        <TaxonLink>Officine Générale</TaxonLink>
        <TaxonLink>Onia</TaxonLink>
        <TaxonLink>rag & bone</TaxonLink>
        <TaxonLink>Valentino</TaxonLink>
        <TaxonLink>Tod's</TaxonLink>
      </SectionContainer>

      <ImageContainer>
        {loading ? (
          <CircularProgress sx={{ color: "#999" }} />
        ) : dynamicImage ? (
          <Image src={dynamicImage} alt="Sale Item" />
        ) : (
          <Typography>Image not available</Typography>
        )}
        <TaxonLink>STYLES AT 70% OFF</TaxonLink>
      </ImageContainer>
    </MainContainer>
  );
}

export default Offers;
