import React from "react";
import axios from "axios";
import ShoppingBag from "../../Componments/Checkout/ShoppingBag";

// Define fetchProductData function
const fetchProductData = async (slug) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v2/storefront/products/${slug}?include=images`
    );
    console.log("API Response:", response.data);

    const productData = response.data;

    if (!productData || !productData.data || !productData.data.id) {
      console.error("Invalid product data format", productData);
      return null;
    }

    const product = {
      id: productData.data.id,
      slug: productData.data.attributes.slug,
      description: productData.data.attributes.description,
      brand: productData.data.attributes.name,
      price: parseFloat(productData.data.attributes.price),
      reviewsCount: 0,
      images: productData.included
        .filter((item) => item.type === "image")
        .map((image) => ({
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

// Fetch product data server-side
export async function getServerSideProps(context) {
  const { slug } = context.params;

  const productData = await fetchProductData(slug);

  return {
    props: {
      productData: productData || { data: [] },
    },
  };
}

// Define ShoppingBagPage component
const ShoppingBagPage = ({ productData }) => {
  return <ShoppingBag productData={productData} />;
};

export default ShoppingBagPage;
