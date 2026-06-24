import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  return (
    <Link to={`/product/${product._id}`}>
      <div
        className="group h-full flex flex-col"
        data-aos="fade-up"
        data-aos-duration="900"
        data-aos-once="true"
      >
        {/* TOP CARD */}
        <div className="bg-gradient-to-br from-[#ECECEC] to-[#DDDDDD] rounded-[30px] p-4 md:p-5 relative overflow-hidden h-[420px] flex flex-col justify-center">

          {/* Discount */}
          <div className="absolute top-5 left-5 bg-primary text-white px-4 py-2 rounded-full text-sm z-10">
            {product.discount || 0}% OFF
          </div>

          {/* Icons */}
          <div className="absolute top-5 right-5 flex flex-col gap-3 z-10 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToWishlist(product);
              }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              <i className="ri-heart-line"></i>
            </button>

            <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-md hover:bg-primary hover:text-white transition-all duration-300">
              <i className="ri-eye-line"></i>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);

                navigate("/cart");
              }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              <i className="ri-shopping-bag-line"></i>
            </button>
          </div>

          {/* Image */}
          <img
            src={
              product.thumbnail ||
              product.images?.[0]
            }
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="w-full h-[280px] md:h-[320px] object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Bottom */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-zinc-500">{product.category?.name}</p>

            <div className="flex items-center gap-2">
              <i className="ri-star-fill text-accent"></i>

              <span className="font-semibold">
                {product.rating
                  ? product.rating.toFixed(1)
                  : "0.0"}
              </span>

              <span className="text-zinc-500 text-sm">
                ({product.totalReviews || 0})
              </span>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mt-3 min-h-[60px]">
            {product.title}
          </h3>

          <div className="flex items-center gap-3 mt-2">
            <h4 className="text-2xl font-bold text-primary">
              ${product.price}
            </h4>

            <span className="text-zinc-400 line-through">
              ${product.oldPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard