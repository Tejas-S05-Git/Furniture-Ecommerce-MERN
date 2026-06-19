import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] =
  useState(() => {
    const savedCart =
      localStorage.getItem("cartItems");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

  // ADD TO CART
 const addToCart = (product, quantity = 1) => {

  if (!user) {
    toast.error("Please login first");
    return;
  }

  setCartItems((prev) => {
  const existingItem = prev.find(
    (item) => item._id === product._id
  );

  if (existingItem) {
    toast.success("Cart updated");

    return prev.map((item) =>
      item._id === product._id
        ? {
            ...item,
            quantity:
              item.quantity + quantity,
          }
        : item
    );
  }

  toast.success("Added to cart");

  return [
    ...prev,
    {
      ...product,
      quantity,
    },
  ];
});
};

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // INCREASE
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // CLEAR
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL
  const cartSubtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;