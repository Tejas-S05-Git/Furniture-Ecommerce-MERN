import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {

  if (!user) {
    toast.error("Please login first");
    return;
  }

  const exists = wishlistItems.find(
    (item) => item.id === product.id
  );

  if (exists) {
    toast("Already in wishlist");
    return;
  }

  setWishlistItems((prev) => [
    ...prev,
    product,
  ]);

  toast.success("Added to wishlist");
};
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);