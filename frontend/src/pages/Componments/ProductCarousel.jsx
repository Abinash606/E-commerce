import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import Router from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to group products into pairs
const groupProducts = (products) => {
  const grouped = [];
  for (let i = 0; i < products.length; i += 2) {
    grouped.push(products.slice(i, i + 2));
  }
  return grouped;
};

// Function to fetch images for a product
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
      height="1024px"
      width="768px"
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

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const id = toast.info("Loading products...", {
        autoClose: false,
        closeButton: true,
      });
      setToastId(id);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v2/storefront/products"
        );

        const productDetailsPromises = response.data.data.map((item) =>
          fetchProductWithImages(item.id)
        );

        const productsWithImages = await Promise.all(productDetailsPromises);
        setProducts(productsWithImages.filter((product) => product !== null));
        setLoading(false);
        toast.update(id, {
          render: "Products loaded!",
          type: "success",
          autoClose: 5000,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        toast.update(id, {
          render: "Failed to load products.",
          type: "error",
          autoClose: 5000,
        });
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = groupProducts(products);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={2}
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "gray",
              size: 60,
            }}
          />
        ) : (
          <Box maxWidth="100%" sx={{ width: "100%" }}>
            <Carousel
              responsive={responsive}
              infinite
              autoPlay={true}
              autoPlaySpeed={3000}
              customTransition="all .5s"
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="react-multi-carousel-item"
              arrows={false}
              sx={{
                "& .react-multi-carousel-item": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {groupedProducts.map((group, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="center"
                  p={2}
                  sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}
                >
                  {group.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Box>
              ))}
            </Carousel>
          </Box>
        )}
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ProductCarousel;
