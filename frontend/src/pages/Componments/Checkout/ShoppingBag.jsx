import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import NavigationLinks from "../NavigationLinks";
import Header from "../Header";
import TopFooter from "../TopFooter";
import Footer from "../Footer";

function ProductInfo({ product, quantity, setQuantity }) {
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", sm: "7 1 70%" },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-start",
        gap: 2,
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          padding: 1,
          borderRadius: 2,
          flex: "1",
        }}
      >
        <img
          src={product.images[0]?.url || ""}
          alt="productImage"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          backgroundColor: "#f9f9f9",
          padding: 2,
          borderRadius: 2,
          marginTop: { xs: 2, sm: 0 },
          flex: "2",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          {product.brand}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "gray",
            fontWeight: 300,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: product?.description || "Product Description",
            }}
          />
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            ₹{product.price}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem", fontWeight: 300 } }}
            >
              {product.colors?.[0] || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem", fontWeight: 300 } }}
            >
              |
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.75rem", sm: "1rem", fontWeight: 300 } }}
            >
              {product.sizes?.[0] || "N/A"}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                },
                minWidth: "auto",
                padding: 0,
              }}
              onClick={decreaseQuantity}
            />
            <RemoveIcon />
            <Typography variant="body2">{quantity}</Typography>
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                },
                minWidth: "auto",
                padding: 0,
              }}
              onClick={increaseQuantity}
            />
            <AddIcon />
          </Box>
        </Box>
        <Box
          sx={{ marginTop: 1, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function OrderSummary({ productData, quantities }) {
  const dispatch = useDispatch();
  const route = useRouter();

  const handleCheckout = async () => {
    const cartToken = localStorage.getItem("cartToken");

    if (!cartToken) {
      console.error("Cart token not found in local storage.");
      return;
    }

    try {
      await Promise.all(
        productData.data.map(async (product, index) => {
          const quantity = quantities[index];

          const response = await fetch(
            "http://localhost:3000/api/v2/storefront/cart/add_item",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Spree-Order-Token": cartToken,
              },
              body: JSON.stringify({
                variant_id: product.id,
                item_count: quantity,
                public_metadata: {
                  first_item_order: true,
                },
                private_metadata: {
                  recommended_by_us: false,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to add item to cart.");
          }

          const data = await response.json();
          console.log("Item added to cart:", data);

          const productInfo = {
            id: product.id,
            name: product.brand,
            description: product.description,
            price: product.price,
            quantity: quantity,
            imageSrc: product.images[0]?.url || "",
            color: product.colors[0] || "N/A",
            size: product.sizes[0] || "N/A",
          };

          dispatch(addItemToCart(productInfo));
        })
      );

      route.push("/Componments/Checkout/CartOne");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const formatCurrency = (value) => {
    const validValue = isNaN(value) ? 0 : value;
    return `₹${validValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", sm: "3 1 30%" },
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "light", marginTop: 2 }}>
        Order Summary
      </Typography>
      {productData.data.map((product, index) => (
        <Box key={product.id} sx={{ marginTop: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "light", marginTop: 2 }}
          >
            {product.brand} - {formatCurrency(product.price)} x{" "}
            {quantities[index]}
          </Typography>
        </Box>
      ))}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
          marginTop: 2,
        }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Box>
  );
}

function ShoppingBag({ productData }) {
  const [quantities, setQuantities] = React.useState(
    productData.data.map(() => 1)
  );

  const handleQuantityChange = (index, quantity) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((q, i) => (i === index ? quantity : q))
    );
  };

  return (
    <Box>
      <Header />
      <Navbar />
      <NavigationLinks />
      <Box sx={{ padding: 2 }}>
        <Typography sx={{ fontWeight: 300, marginLeft: { xs: 2, sm: 7 } }}>
          Shopping Bag
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            padding: { xs: 2, sm: 7 },
            gap: 2,
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "7 1 70%" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {productData.data.map((product, index) => (
              <ProductInfo
                key={product.id}
                product={product}
                quantity={quantities[index]}
                setQuantity={(quantity) =>
                  handleQuantityChange(index, quantity)
                }
              />
            ))}
          </Box>
          <OrderSummary productData={productData} quantities={quantities} />
        </Box>
      </Box>
      <TopFooter />
      <Footer />
    </Box>
  );
}

export default ShoppingBag;
