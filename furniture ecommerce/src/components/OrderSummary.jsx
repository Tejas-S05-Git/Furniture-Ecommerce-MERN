import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const OrderSummary = ({
  showButton = true,
  paymentButton = false,
  onPaymentClick,
  processing = false,

  items = [],

  subtotal = 0,

  discount = 0,

  coupon = null,
  shipping = 0,

  tax = 0,

  finalAmount,
}) => {



  const total = finalAmount;

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
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>
          <span>₹{tax}</span>
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span>-₹{discount}</span>
        </div>
        {coupon && (
          <div className="flex justify-between text-green-600 text-sm">

            <span>

              Coupon Applied

            </span>

            <span>

              {coupon.code}

            </span>

          </div>
        )}
      </div>

      <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>₹{total}</span>
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

            navigate("/checkout", {
              state: {
                coupon,

                discount,

                subtotal,

                shipping,

                tax,

                total,
              },
            });
          }}
          disabled={processing}
          className={`w-full mt-8 h-14 rounded-full font-semibold transition-all
    ${items.length === 0
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
          {
            processing
              ?

              "Processing..."

              :

              "Confirm Payment"

          }
        </button>
      )}
    </div>
  );
};

export default OrderSummary;