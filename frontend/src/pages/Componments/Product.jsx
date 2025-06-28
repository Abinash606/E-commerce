import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Router from "next/router";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const fetchProductWithImages = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v2/storefront/products/${productId}?include=images`
    );
    const product = response.data.data;
    const images = response.data.included || [];

    return {
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      ),
      imageUrl:
        images.length > 0
          ? `http://localhost:3000${images[0].attributes.original_url}`
          : "",
      slug: product.attributes.localized_slugs.en,
    };
  } catch (error) {
    console.error(`Error fetching product with images (${productId}):`, error);
    return null;
  }
};

const ProductCard = ({ product }) => (
  <Card
    sx={{
      width: { xs: "90%", sm: "80%", md: 300, lg: 350 },
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
      src={product.imageUrl}
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
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "auto",
        }}
      >
        <Button
          sx={{
            width: "100%",
            maxWidth: 150,
            marginTop: 2,
            textAlign: "center",
            border: "1px solid black",
            color: "grey",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={() => Router.push(`/products/${product.slug}`)}
        >
          SHOP NOW
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v2/storefront/products"
        );
        console.log("API Response:", response.data);

        const productDetailsPromises = response.data.data.map((item) =>
          fetchProductWithImages(item.id)
        );

        const productsWithImages = await Promise.all(productDetailsPromises);
        setProducts(productsWithImages.filter((product) => product !== null));
      } catch (error) {
        console.error("Error fetching products:", error);

        toast.error("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };

  return (
    <Box
      sx={{
        padding: { xs: 1, sm: 2, md: 3 },
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderBottom: "1px solid #ddd",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            px: 2,
            whiteSpace: "nowrap",
            fontSize: { xs: "16px", sm: "18px" },
          }}
        >
          SEASONAL STAPLES
        </Typography>
        <Box
          sx={{
            flex: 1,
            borderBottom: "1px solid #ddd",
          }}
        />
      </Box>

      <Carousel
        responsive={responsive}
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="carousel"
        containerClass="container"
        dotListClass="custom-dot-list-style"
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item"
        keyBoardControl
        minimumTouchDrag={80}
        showDots={false}
        slidesToSlide={1}
        swipeable
        customTransition="all .5s ease"
        transitionDuration={500}
        arrows={false}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              padding: "0 8px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Product;
