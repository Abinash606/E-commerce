import React, { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RiVisaLine } from "react-icons/ri";
import { FaStripe } from "react-icons/fa6";
import { RiMastercardFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useRouter } from "next/router";

export function PaymentOption() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const selectedAddress = useSelector(
    (state) => state.checkout.selectedAddress
  );
  const [cardNum, setCardNum] = useState("");
  const [maskedCardNum, setMaskedCardNum] = useState("");
  const [cvc, setCvc] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 199;
  const discount = 199;
  const total = subtotal + shipping - discount;

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 16) value = value.slice(0, 16);

    setCardNum(value);

    let formattedValue = value.replace(/(.{4})/g, "$1 ").trim();

    setMaskedCardNum(formattedValue);
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;

    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    setExpirationDate(formattedValue);
  };

  const handlePayment = async () => {
    const cartToken = localStorage.getItem("cartToken");
    const lastDigits = cardNum.slice(-4);
    const [expirationMonth, expirationYear] = expirationDate.split("/");

    if (!expirationMonth || !expirationYear) {
      toast.error("Invalid expiration date.");
      return;
    }
    if (cardNum.length < 13 || cardNum.length > 16) {
      toast.error(
        "Invalid card number length. Please enter a valid card number."
      );
      return;
    }
    const fullYear = `20${expirationYear}`;
    const paymentData = {
      payment_method_id: "5",
      amount: total,
      source_attributes: {
        card_number: "4242 4242 4242 4242",
        last_digits: "4242",
        verification_value: "121",
        month: parseInt(expirationMonth, 10),
        year: parseInt(fullYear, 10),
        cc_type: "visa",
        name: `${selectedAddress.attributes.firstname} ${selectedAddress.attributes.lastname}`,
        gateway_payment_profile_id: "5",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v2/storefront/checkout/create_payment",
        {
          method: "POST",
          headers: {
            "X-Spree-Order-Token": cartToken,
            "Content-Type": "application/vnd.api+json",
          },
          body: JSON.stringify({
            payment_method_id: "5",
            source_id: "164",
            gateway: "stripe",
            amount: total,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const data = await response.json();
      console.log("Payment successful", data);
      toast.success("Payment successful!");
      await checkoutNext();
    } catch (error) {
      console.error("Payment failed", error);
      toast.error(
        "Payment failed: " +
          (error.message || "Please check your card details and try again.")
      );
    }
  };
  const checkoutNext = async () => {
    const cartToken = localStorage.getItem("cartToken");
    if (!cartToken) {
      console.error("Cart token not found in local storage.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/v2/storefront/checkout/next",
        {
          method: "PATCH",
          headers: {
            "X-Spree-Order-Token": cartToken,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Checkout next step failed");
      }

      const data = await response.json();
      console.log("Checkout moved to next step", data);
      setTimeout(async () => {
        await completeCheckout();
        dispatch(clearCart());
        route.push("/");
      }, 5000);
    } catch (error) {
      console.error("Checkout next step failed", error);
      toast.error(
        "Checkout next step failed: " + (error.message || "Please try again.")
      );
    }
  };
  const completeCheckout = async () => {
    const cartToken = localStorage.getItem("cartToken");
    if (!cartToken) {
      console.error("Cart token not found in local storage.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/v2/storefront/checkout/complete",
        {
          method: "PATCH",
          headers: {
            "X-Spree-Order-Token": cartToken,
            "Content-Type": "application/vnd.api+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Checkout completion failed");
      }

      const data = await response.json();
      console.log("Checkout completed successfully", data);
      toast.success("Checkout completed successfully!");
    } catch (error) {
      console.error("Checkout completion failed", error);
      toast.error(
        "Checkout completion failed: " + (error.message || "Please try again.")
      );
    }
  };
  return (
    <div>
      <Header />
      <Navbar />
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <form>
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Payment details
                          </h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <RiVisaLine size={24} />
                            <FaStripe size={24} />
                            <RiMastercardFill size={24} />
                          </div>
                          <div className="col-span-3 sm:col-span-2">
                            <label
                              htmlFor="cardNum"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Card number
                            </label>
                            <div className="mt-1">
                              <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="XXXX XXXX XXXX XXXX"
                                id="cardNum"
                                maxLength={19}
                                value={maskedCardNum}
                                onChange={handleCardNumberChange}
                              />
                            </div>

                            <div className="col-span-1">
                              <label
                                htmlFor="expiration-date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Expiration date
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="expiration-date"
                                  id="expiration-date"
                                  maxLength="7"
                                  placeholder="MM/YY"
                                  autoComplete="cc-exp"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={expirationDate}
                                  onChange={handleExpirationDateChange}
                                />
                              </div>
                            </div>

                            <div className="col-span-1">
                              <label
                                htmlFor="cvc"
                                className="block text-sm font-medium text-gray-700"
                              >
                                CVC
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="cvc"
                                  id="cvc"
                                  autoComplete="csc"
                                  value={cvc}
                                  onChange={(e) => setCvc(e.target.value)}
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shipping address
                        </h3>
                        <div className="mt-6">
                          <div className="rounded-md border  px-3 py-2">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {selectedAddress
                                ? `${selectedAddress.attributes.firstname} ${selectedAddress.attributes.lastname}\n
                 ${selectedAddress.attributes.address1} \n
                 ${selectedAddress.attributes.city}, ${selectedAddress.attributes.state_name} ${selectedAddress.attributes.zipcode}\n
                 ${selectedAddress.attributes.country_name}`
                                : "No address selected"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Billing information
                        </h3>
                        <div className="mt-6 flex items-center">
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                          type="button"
                          className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
                          onClick={handlePayment}
                        >
                          Make payment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {cartItems.length > 0 ? (
                    cartItems.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center justify-between space-x-5 py-7"
                      >
                        <div className="flex flex-1 items-center">
                          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20">
                            <img
                              className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                              src={product.imageSrc}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-center">
                            <div>
                              <p className="text-sm font-bold">
                                {product.name}
                              </p>
                              {/* <p className="mt-1.5 text-sm font-medium text-gray-500">
                                {product.color || "N/A"}
                              </p> */}
                              <p className="mt-1.5 text-sm font-medium text-gray-500">
                                Size {product.size}
                              </p>
                            </div>
                            <p className="mt-4 text-sm font-bold text-gray-900">
                              {product.price}
                            </p>
                          </div>
                        </div>
                        <div className="ml-5 flex items-center">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <X className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-7 text-center text-gray-500">
                      No items in cart
                    </li>
                  )}
                </ul>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-gray-900">Subtotal</p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{subtotal}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-gray-900">Shipping</p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{shipping}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-gray-900">Discount</p>
                    <p className="text-sm font-bold text-gray-900">
                      -₹{discount}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-gray-900">Total</p>
                    <p className="text-sm font-bold text-gray-900">₹{total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default PaymentOption;
