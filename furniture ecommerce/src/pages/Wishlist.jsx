import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import HeroPage from "../components/HeroPage";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.title} added to cart`);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item, 1);
    });

    toast.success("All items added to cart");
  };

  return (
    <>
      <HeroPage
        title="Shopping Cart"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Wishlist" },
        ]}
      />
    <section className="bg-secondary min-h-screen py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP HEADER */}
        <div
          data-aos="fade-up"
          className="hidden lg:grid grid-cols-6 bg-accent rounded-2xl px-8 py-4 mb-6 font-medium"
        >
          <div></div>
          <div>Product</div>
          <div>Price</div>
          <div>Date Added</div>
          <div>Stock Status</div>
          <div></div>
        </div>

        {/* EMPTY */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-primary">
              Your Wishlist is Empty
            </h2>
          </div>
        )}

        {/* ITEMS */}
        <div className="space-y-5">
          {wishlistItems.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white lg:bg-transparent rounded-3xl p-5 lg:p-0 border border-zinc-200 lg:border-x-0 lg:border-t-0 lg:border-b"
            >
              <div className="grid lg:grid-cols-6 items-center gap-5 py-3">

                {/* REMOVE */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-2xl text-zinc-500 hover:text-red-500 transition"
                >
                  <i className="ri-close-line"></i>
                </button>

                {/* PRODUCT */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-sm">
                      {item.category}
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <h4 className="font-semibold text-lg text-primary">
                  ${item.price}
                </h4>

                {/* DATE */}
                <p className="text-zinc-600">18 April 2024</p>

                {/* STOCK */}
                <p className="text-green-500 font-medium">
                  Instock
                </p>

                {/* BUTTON */}
                <div className="lg:flex justify-end">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary hover:opacity-90 text-white px-7 py-3 rounded-full transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        {wishlistItems.length > 0 && (
          <div
            data-aos="fade-up"
            className="mt-12 flex flex-col lg:flex-row gap-6 justify-between items-center"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center w-full lg:w-auto">
              <span className="underline text-zinc-700">
                Wishlist link:
              </span>

              <input
                type="text"
                readOnly
                value="https://www.example.com"
                className="px-6 py-3 rounded-full border bg-white outline-none"
              />

              <button className="bg-primary text-white px-7 py-3 rounded-full">
                Copy Link
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="underline text-primary">
                Clear Wishlist
              </button>

              <button
                onClick={handleAddAllToCart}
                className="bg-primary text-white px-8 py-3 rounded-full"
              >
                Add All To Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default Wishlist;