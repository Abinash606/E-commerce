import React, { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import NavigationLinks from "../NavigationLinks";
import Navbar from "../Navbar";
import TopFooter from "../TopFooter";
import Footer from "../Footer";
import { removeItemFromCart } from "../../redux/cartSlice";

export function CartOne() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loadingStates, setLoadingStates] = useState({});
  const itemCount = useSelector((state) => state.cart.itemCount);

  React.useEffect(() => {
    console.log("Cart items from Redux:", cartItems);
  }, [cartItems]);

  const parsePrice = (priceString) => {
    const cleanedString = String(priceString).replace(/[^0-9.]+/g, "");
    return parseFloat(cleanedString);
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parsePrice(item.price);
    if (!isNaN(price)) {
      return total + price;
    }
    console.error("Invalid price found:", item.price);
    return total;
  }, 0);

  const handleRemove = (productId) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    setTimeout(() => {
      dispatch(removeItemFromCart(productId));
      setLoadingStates((prevState) => ({
        ...prevState,
        [productId]: false,
      }));
    }, 500);
  };

  const associateCart = async () => {
    const cartToken = localStorage.getItem("cartToken");
    const accessToken = localStorage.getItem("access_token");

    if (!cartToken) {
      console.error("Cart token not found");
      return;
    }

    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/v2/storefront/cart/associate?guest_order_token=${cartToken}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Cart associated successfully");
        router.push("/Componments/Checkout/ShippingOptions");
      } else {
        console.error(`Failed to associate cart: ${data.error}`);
      }
    } catch (error) {
      console.error("Error associating cart:", error);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <NavigationLinks />
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <p className="mt-3 text-sm font-medium text-gray-700">
          To shop or not to shop, that's not even a question..
        </p>
        <ul className="flex flex-col divide-y divide-gray-200">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <li
                key={product.id}
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                    src={product.imageSrc}
                    alt={product.name || "Product Image"}
                  />
                  <div className="flex w-full flex-col justify-between pb-4">
                    <div className="flex w-full justify-between space-x-2 pb-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {product.name || "No name available"}
                        </h3>
                        <p className="text-sm">
                          {product.size || "Size not specified"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {product.price
                            ? `₹${product.price}`
                            : "Price not available"}
                        </p>
                      </div>
                    </div>
                    <div className="flex divide-x text-sm">
                      {loadingStates[product.id] ? (
                        <Loader2
                          className="animate-spin text-gray-500"
                          size={16}
                        />
                      ) : (
                        <button
                          type="button"
                          className="flex items-center space-x-2 px-2 py-1 pl-0"
                          onClick={() => handleRemove(product.id)}
                        >
                          <Trash size={16} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No product information found.</li>
          )}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold">
              {cartItems.length > 0 ? ` ₹${totalAmount.toFixed(2)}` : "₹0"}
            </span>
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-white bg-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => router.push("/")}
          >
            Back to shop
          </button>
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-white bg-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={associateCart}
          >
            Checkout
          </button>
        </div>
      </div>
      <TopFooter />
      <Footer />
    </div>
  );
}

export default CartOne;
