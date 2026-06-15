import React, { useEffect, useState, } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

import ProductCard from "./ProductCard";

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRelatedProducts =
    async () => {
      try {
        const response =
          await api.get(
            "/products"
          );

        const filtered =
          response.data.products
            .filter(
              (item) =>
                item._id !== id
            )
            .slice(0, 4);

        setRelatedProducts(
          filtered
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchRelatedProducts();
  }, [id]);


  const { id } = useParams();



  if (!relatedProducts.length) return null;

  return (
    <section className="pb-20 lg:pb-28 bg-white overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4">

        <div className="max-w-[1320px] mx-auto px-4">

          {/* heading */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-center mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-5 h-[2px] bg-accent"></span>

              <p className="text-zinc-600 text-lg md:text-xl">
                Related Products
              </p>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#222222]">
              Explore <span className="text-primary">Related Products</span>
            </h2>
          </div>

        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;