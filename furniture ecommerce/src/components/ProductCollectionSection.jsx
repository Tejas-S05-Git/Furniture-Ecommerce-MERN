import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { Mousewheel } from "swiper/modules";


import "swiper/css";
import "swiper/css/mousewheel";
const ProductCollectionSection = ({ products }) => {

  const [activeFilter, setActiveFilter] = useState("all");

let filteredProducts = [...products];

if (activeFilter === "featured") {
  filteredProducts = filteredProducts.filter(
    (product) => product.featured
  );
}

if (activeFilter === "best") {
  filteredProducts = filteredProducts.filter(
    (product) => (product.rating || 0) >= 4
  );
}

if (activeFilter === "latest") {
  filteredProducts.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );
}

if (!products?.length) {
  return (
    <div className="text-center py-20">
      No Products Found
    </div>
  );
}


  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

        {/* HEADING */}

        <div className="text-center" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-[2px] bg-accent"></div>
            <p className="text-zinc-700 text-lg">Our Products</p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-5">
            Our <span className="text-primary">Products Collections</span>
          </h2>
        </div>

        {/* FILTER BUTTONS */}

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeFilter === "all"
              ? "bg-primary text-white"
              : "border border-zinc-300 bg-white text-zinc-800"
              }`}
          >
            All Products
          </button>

          <button
            onClick={() => setActiveFilter("latest")}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeFilter === "latest"
              ? "bg-primary text-white"
              : "border border-zinc-300 bg-white text-zinc-800"
              }`}
          >
            Latest Products
          </button>

          <button
            onClick={() => setActiveFilter("best")}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeFilter === "best"
              ? "bg-primary text-white"
              : "border border-zinc-300 bg-white text-zinc-800"
              }`}
          >
            Best Sellers
          </button>

          <button
            onClick={() => setActiveFilter("featured")}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeFilter === "featured"
              ? "bg-primary text-white"
              : "border border-zinc-300 bg-white text-zinc-800"
              }`}
          >
            Featured Products
          </button>
        </div>

        {/* TOP */}
        <div
          data-aos="fade-up"
          className="flex items-center justify-center mt-14 mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Trending Products
          </h3>
        </div>

        {/* SWIPER */}

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="overflow-hidden xl:overflow-visible"
        >
          <Swiper
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 1,
            }}
            spaceBetween={24}
            speed={700}
            grabCursor={false}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              640: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1400: {
                slidesPerView: 3.2,
              },
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default ProductCollectionSection