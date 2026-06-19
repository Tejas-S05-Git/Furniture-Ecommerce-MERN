import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] =
    useState(() => {
      const savedWishlist =
        localStorage.getItem(
          "wishlistItems"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);
  const addToWishlist = (product) => {
    const exists =
      wishlistItems.find(
        (item) =>
          item._id === product._id
      );

    if (exists) {
      toast.error(
        "Already in wishlist"
      );
      return;
    }

    setWishlistItems([
      ...wishlistItems,
      product,
    ]);

    toast.success(
      "Added to wishlist"
    );
  };
  const removeFromWishlist = (
  productId
) => {
  setWishlistItems(
    wishlistItems.filter(
      (item) =>
        item._id !== productId
    )
  );

  toast.success(
    "Removed from wishlist"
  );
};

const clearWishlist = () => {
  setWishlistItems([]);
};
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);