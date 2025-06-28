import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";

const fetchProductsWithImages = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v2/storefront/products?include=images"
    );
    const products = response.data.data;
    console.log(response.data);

    const includedImages = response.data.included || [];

    const productDetails = products.map((item) => {
      const productImage = includedImages.find(
        (image) => image.id === item.relationships.images.data?.[0]?.id
      );
      const price = parseFloat(item.attributes.price);
      const originalPrice = parseFloat(item.attributes.compare_at_price);
      const discount =
        originalPrice > price
          ? ((originalPrice - price) / originalPrice) * 100
          : 0;
      return {
        id: item.id,
        name: item.attributes.name,
        price: `$${item.attributes.price}`,
        originalPrice: `$${item.attributes.compare_at_price}`,
        discount: discount > 0 ? `${discount.toFixed(0)}%` : "",
        image: productImage
          ? `http://localhost:3000${productImage.attributes.original_url}`
          : "",
        slug: item.attributes.localized_slugs.en,
      };
    });

    console.log(productDetails);
    return productDetails;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products.");
    return [];
  }
};
const ProductCard = ({ product }) => (
  <Card
    sx={{
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mx: 1,
      overflow: "hidden",
      boxShadow: 3,
      mb: 2,
    }}
  >
    <CardMedia
      component="img"
      src={product.image}
      alt={product.name}
      height="200"
      sx={{ objectFit: "cover" }}
    />
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        height: "auto",
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ mb: 1, color: "gray", cursor: "pointer" }}
          onClick={() => Router.push(`/products/${product.slug}`)}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            textDecoration: "line-through",
            textAlign: "center",
            color: "gray",
          }}
        >
          {product.originalPrice}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          {product.price}
        </Typography>
        <Typography
          variant="body2"
          color="secondary"
          sx={{ textAlign: "center", color: "gray" }}
        >
          {product.discount}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "auto",
        }}
      ></Box>
    </CardContent>
  </Card>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsWithImages();
      setProducts(fetchedProducts);

      const count = fetchedProducts.length;
      setProductCount(count);
      localStorage.setItem("productCount", count);
    };

    loadProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            No products available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;
