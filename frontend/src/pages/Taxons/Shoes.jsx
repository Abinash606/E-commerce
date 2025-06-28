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
  max-width: 160px;
  height: auto;
  // border-radius: 8px;
  background-color: #f5f5f5;
  margin-bottom: 15px;
`;

const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-right: 44px;
  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Column = styled(Box)`
  flex: 1 1 25%;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 900px) {
    flex: 1 1 50%;
  }
  @media (max-width: 600px) {
    flex: 1 1 100%;
    padding: 0 10px;
    margin-bottom: 20px;
  }
`;

const ShoesContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
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
function Shoes() {
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
  if (loading) {
    return (
      <LoaderContainer>
        <CircularProgress style={{ color: "#888" }} />
      </LoaderContainer>
    );
  }
  return (
    <ShoesContainer>
      <Column>
        <Typography variant="h6" gutterBottom>
          SHOES
        </Typography>
        <Line />
        <TaxonLink>All Shoes</TaxonLink>
        <TaxonLink>Sneakers</TaxonLink>
        <TaxonLink>Boots</TaxonLink>
        <TaxonLink>Formal Shoes</TaxonLink>
        <TaxonLink>Loafers</TaxonLink>
        <TaxonLink>Lace Up's</TaxonLink>
      </Column>

      <Column>
        <Typography variant="h6" gutterBottom>
          DESIGNERS
        </Typography>
        <Line />
        <TaxonLink>Adidas</TaxonLink>
        <TaxonLink>Ferragamo</TaxonLink>
        <TaxonLink>Maison Margiela</TaxonLink>
        <TaxonLink>Paul Smith</TaxonLink>
        <TaxonLink>Thom Browne</TaxonLink>
        <TaxonLink>Tod's</TaxonLink>
      </Column>

      {images.slice(6, 8).map((image, index) => (
        <ImageContainer key={index}>
          <Image src={image.imageUrl} alt={image.name} />
          <Typography variant="body2">{image.name.toUpperCase()}</Typography>
        </ImageContainer>
      ))}
    </ShoesContainer>
  );
}

export default Shoes;
