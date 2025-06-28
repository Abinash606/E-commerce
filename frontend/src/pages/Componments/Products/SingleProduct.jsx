import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { Box, Typography } from "@mui/material";
import Router from "next/router";
import axios from "axios";
import Navbar from "../Navbar";
import NavigationLinks from "../NavigationLinks";
import Header from "../Header";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

// Remove the fallback image
const ThumbnailSidebar = ({ selectedImage, onSelectImage, images }) => (
  <div className="flex flex-col gap-2 w-full lg:w-1/6 lg:sticky lg:top-24">
    {images.map((image, index) => (
      <img
        key={index}
        src={image.url}
        alt={`Thumbnail ${index + 1}`}
        className={`h-20 w-full object-cover cursor-pointer rounded ${
          image.url === selectedImage ? "border-2 border-gray-500" : ""
        }`}
        onClick={() => onSelectImage(image.url)}
      />
    ))}
  </div>
);

const MainImage = ({ selectedImage }) => (
  <img
    alt="Product Image"
    className="h-64 w-full rounded object-cover lg:h-96 lg:w-full"
    src={selectedImage}
    onError={(e) => {
      console.error("Image failed to load:", e.currentTarget.src);
      e.currentTarget.src = "";
    }}
  />
);

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0]?.url || ""
  );

  const handleBag = async (slug) => {
    try {
      // Make API request to add product to cart
      const response = await axios.post(
        "http://localhost:3000/api/v2/storefront/cart",
        {
          // Add product details to request body if needed
        }
      );

      // Extract token from API response
      const token = response.data.data.attributes.token;

      // Store the token in local storage
      localStorage.setItem("cartToken", token);

      // Log the token to the console
      console.log("Cart Token:", token);

      // Navigate to the shopping bag page with the slug parameter
      Router.push({
        pathname: "/checkout/shopping-bag/[slug]",
        query: { slug: slug },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="mt-6 lg:ml-10">
      <Typography
        variant="h6"
        className="text-sm font-semibold tracking-widest text-gray-900"
      >
        {product?.brand || "Brand Name"}
      </Typography>
      <Typography
        variant="body1"
        className="my-4 text-xl font-light text-gray-500"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: product?.description || "Product Description",
          }}
        />
      </Typography>
      <div className="my-4 flex items-center">
        <span className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-500" />
          ))}
          <span className="ml-3 inline-block text-xs font-semibold">
            {product?.reviewsCount || "0 Reviews"}
          </span>
        </span>
      </div>
      <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
        <div className="flex items-center">
          <span className="mr-3 text-sm font-semibold">Color</span>
          {product?.colors?.length ? (
            product.colors.map((color, index) => (
              <button
                key={index}
                className={`h-6 w-6 rounded-full border-2 border-gray-300 ${
                  color === "selected" ? "bg-gray-700" : "bg-gray-200"
                }`}
                style={{ backgroundColor: color }}
              />
            ))
          ) : (
            <span className="text-gray-500">No colors available</span>
          )}
        </div>
        <div className="ml-auto flex items-center">
          <span className="mr-3 text-sm font-semibold">Size</span>
          <div className="relative">
            <select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
              {product?.sizes?.map((size, index) => (
                <option key={index}>{size}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
              <ChevronDown size={16} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="title-font text-xl font-bold text-gray-900">
          ₹{product?.price || "0"}
        </span>
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => handleBag(product.slug)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const SingleProduct = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0]?.url || ""
  );
  const productImages = product?.images || [];

  console.log("Selected Image:", selectedImage);

  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-wrap lg:flex-nowrap">
            <ThumbnailSidebar
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              images={productImages}
            />
            <div className="w-full lg:w-1/2 lg:pl-10">
              <MainImage selectedImage={selectedImage} />
            </div>
            <div className="w-full lg:w-1/3 lg:pl-10">
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </section>
      <TopFooter />
      <Footer />
    </Box>
  );
};

export default SingleProduct;
