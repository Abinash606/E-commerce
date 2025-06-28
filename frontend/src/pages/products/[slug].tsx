import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SingleProduct from "../Componments/Products/SingleProduct"; // Fixed typo
import { Box, Typography, CircularProgress } from "@mui/material";

// Define the types for product data
interface ProductImage {
  url: string;
}

interface Product {
  id: string;
  slug: string;
  description: string;
  brand: string;
  price: number;
  reviewsCount: number;
  images: ProductImage[];
  colors?: string[];
  sizes?: string[];
}

interface ProductData {
  data: Product[];
}

// Define the type for the page props
interface ProductPageProps {
  productData: ProductData;
}

const fetchProductData = async (slug: string): Promise<ProductData | null> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v2/storefront/products/${slug}?include=images`
    );
    console.log("API Response:", response.data);

    const productData = response.data;

    const product = {
      id: productData.data.id,
      slug: productData.data.attributes.slug,
      description: productData.data.attributes.description,
      brand: productData.data.attributes.name,
      price: parseFloat(productData.data.attributes.price),
      reviewsCount: 0,
      images: productData.included
        .filter((item: any) => item.type === "image")
        .map((image: any) => ({
          url: `http://localhost:3000${image.attributes.original_url}` || "",
        })),
      colors: [],
      sizes: ["M", "L", "XL", "XXL"],
    };

    console.log("Processed Product Data:", product);

    return { data: [product] };
  } catch (error) {
    console.error(`Error fetching product data for slug (${slug}):`, error);
    return null;
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ productData }) => {
  const router = useRouter();
  const { slug } = router.query;

  if (!productData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "gray" }} />
      </Box>
    );
  }

  if (productData.data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  return <SingleProduct product={productData.data[0]} />;
};

export async function getServerSideProps(context: {
  params: { slug: string };
}) {
  const { slug } = context.params;
  const productData = await fetchProductData(slug);

  return {
    props: {
      productData: productData || { data: [] },
    },
  };
}

export default ProductPage;
