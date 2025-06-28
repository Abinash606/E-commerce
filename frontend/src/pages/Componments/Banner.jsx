import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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
      imageUrl:
        images.length > 0
          ? `http://localhost:3000${images[0].attributes.original_url}`
          : "",
    };
  } catch (error) {
    console.error(`Error fetching product with images (${productId}):`, error);
    return null;
  }
};

const CustomButtonGroup = ({ next, previous }) => (
  <Box
    sx={{
      position: "absolute",
      width: "100%",
      top: "50%",
      display: "flex",
      justifyContent: "space-between",
      px: 2,
      transform: "translateY(-50%)",
      zIndex: 1,
    }}
  >
    <IconButton
      onClick={previous}
      sx={{
        background: "transparent",
        color: "#000",
        display: { xs: "none", md: "block" },
      }}
    >
      <ArrowBackIos />
    </IconButton>
    <IconButton
      onClick={next}
      sx={{
        background: "transparent",
        color: "#000",
        display: { xs: "none", md: "block" },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  </Box>
);

const Banner = () => {
  const [images, setImages] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const productIds = [1, 2, 3, 4, 5];

        const imagePromises = productIds.map((id) =>
          fetchProductWithImages(id)
        );
        const fetchedImages = await Promise.all(imagePromises);
        const validImages = fetchedImages.filter(
          (item) => item && item.imageUrl
        );
        setImages(validImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        arrows={false}
        customButtonGroup={
          <CustomButtonGroup
            next={() => carouselRef.current.next()}
            previous={() => carouselRef.current.previous()}
          />
        }
        containerClass="carousel-container"
        itemClass="react-multi-carousel-item"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: 180, sm: 220, md: 260 },
            padding: 1,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box sx={{ textAlign: "center", color: "#333", p: 2 }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontSize: { xs: "0.875rem", md: "1.125rem" } }}
            >
              Just In
            </Typography>
            <Typography
              sx={{ mb: 2, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              A curated selection of the latest styles
            </Typography>
            <a href="#" style={{ textDecoration: "underline", color: "#333" }}>
              View More
            </a>
          </Box>
        </Box>

        {images.map((image) => (
          <Box
            key={image.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Card
              sx={{
                border: "2px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2,
                width: { xs: "90%", sm: 300 },
                height: { xs: 180, sm: 240 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={image.imageUrl}
                alt={`Banner Image ${image.id}`}
                sx={{ objectFit: "cover", width: "100%" }}
              />
            </Card>
            <Box sx={{ p: 1, textAlign: "center", mt: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {image.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Banner;
