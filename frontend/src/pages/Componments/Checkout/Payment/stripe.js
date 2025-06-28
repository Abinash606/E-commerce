import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PWFmYJhFzZQTnhfGMMQ7k4dzElhcCzSy5S1uFnBPqFh3qCdMgJJqaFco80HFfY82hErhZekNnd26lqrn3V53h6n00Db2UCZgF"
);

export default stripePromise;
