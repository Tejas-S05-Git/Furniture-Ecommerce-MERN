import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[80px_1.5fr_1fr_1fr_1fr] gap-6 items-center border-b border-zinc-200 pb-6"
      data-aos="fade-up"
    >
      {/* remove */}
      <button
        onClick={() =>
          removeFromCart(item._id)
        }
        className="text-2xl"
      >
        ×
      </button>

      {/* product */}
      <div className="flex items-center gap-4">
        <img
          src={
            item.thumbnail ||
            item.images?.[0]
          }
          alt={item.title}
          className="w-20 h-20 rounded-2xl bg-secondary object-cover"
        />

        <div>
          <h3 className="font-semibold text-xl">
            {item.title}
          </h3>

          <p className="text-zinc-500">
            Color : {item.color}
          </p>
        </div>
      </div>

      {/* price */}
      <p className="font-medium">
        ${item.price}
      </p>

      {/* quantity */}
      <div className="h-12 border rounded-full flex items-center w-fit overflow-hidden">
        <button
          onClick={() =>
            decreaseQuantity(item._id)
          }
          className="px-4 text-xl"
        >
          -
        </button>

        <span className="px-5">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            increaseQuantity(item._id)
          }
          className="px-4 text-xl"
        >
          +
        </button>
      </div>

      {/* subtotal */}
      <p className="font-semibold">
        $
        {item.price * item.quantity}
      </p>
    </div>
  );
};

export default CartItem;