import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const OrderSummary = ({  showButton = true,
  paymentButton = false,
  onPaymentClick,
  items = [],
  subtotal = 0, }) => {

const shipping = 0;
const tax = 0;

const discount =
  subtotal > 1000 ? 100 : 0;

const total =
  subtotal +
  shipping +
  tax -
  discount;

  const navigate = useNavigate();  

  return (
    <div
      className="border border-zinc-200 rounded-[24px] p-8 sticky top-24"
      data-aos="fade-left"
    >
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>
          <span>$0.00</span>
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span>-${discount}</span>
        </div>
      </div>

      <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>${total}</span>
      </div>

    {showButton && (
  <button
  onClick={() => {
    if (items.length === 0) {
      toast.error(
        "Your cart is empty"
      );
      return;
    }

    navigate("/checkout");
  }}
  disabled={items.length === 0}
  className={`w-full mt-8 h-14 rounded-full font-semibold transition-all
    ${
      items.length === 0
        ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
        : "bg-primary text-white"
    }`}
>
  Proceed to Checkout
</button>
)}

{paymentButton && (
  <button
    onClick={onPaymentClick}
    className="w-full mt-8 h-14 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-all duration-300"
  >
    Confirm Payment
  </button>
)}
    </div>
  );
};

export default OrderSummary;