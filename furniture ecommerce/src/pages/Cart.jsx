import React from "react";
import HeroPage from "../components/HeroPage";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, clearCart, cartSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const [coupon, setCoupon] = useState(null);

  const [discount, setDiscount] = useState(0);

  const [finalAmount, setFinalAmount] = useState(cartSubtotal);


  const handleApplyCoupon =
    async () => {
      if (!couponCode.trim()) {
        toast.error(
          "Enter coupon code"
        );

        return;
      }

      try {
        const res =
          await api.post(
            "/coupons/apply",
            {
              code: couponCode,
              orderAmount:
                cartSubtotal,
            }
          );

        setCoupon(
          res.data.coupon
        );

        setDiscount(
          res.data.discount
        );

        setFinalAmount(
          res.data.finalAmount
        );

        toast.success(
          "Coupon applied successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
          "Invalid Coupon"
        );

        setCoupon(null);

        setDiscount(0);

        setFinalAmount(
          cartSubtotal
        );
      }
    };
  return (
    <>
      <HeroPage
        title="Shopping Cart"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Cart" },
        ]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-4">

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

            {/* LEFT */}
            <div>

              {/* TABLE HEADER */}
              <div className="hidden md:grid grid-cols-[80px_1.5fr_1fr_1fr_1fr] bg-accent rounded-[20px] px-8 py-5 font-semibold mb-6">
                <div></div>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
              </div>

              {/* ITEMS */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>

              {/* COUPON */}
              <div className="flex flex-col md:flex-row gap-4 justify-between mt-10">

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="Coupon Code"
                    className="h-14 rounded-full border border-zinc-200 px-6 outline-none"
                  />

                  <button
                    onClick={
                      handleApplyCoupon
                    }
                    className="bg-primary text-white px-8 h-14 rounded-full font-semibold"
                  >
                    Apply Coupon
                  </button>
                </div>

                <button
                  onClick={clearCart}
                  className="text-primary underline font-medium"
                >
                  Clear Shopping Cart
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <OrderSummary
              items={cartItems}
              subtotal={cartSubtotal}
              discount={discount}
              coupon={coupon}
              finalAmount={finalAmount}
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;