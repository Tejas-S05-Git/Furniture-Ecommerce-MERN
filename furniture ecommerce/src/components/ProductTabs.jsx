import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductTabs = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1300px] mx-auto px-4">

        {/* TAB BUTTONS */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="border-b border-zinc-200"
        >
          <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-20 overflow-x-auto no-scrollbar">

            <button
              onClick={() => setActiveTab("description")}
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${
                activeTab === "description"
                  ? "text-primary"
                  : "text-zinc-400 hover:text-primary"
              }`}
            >
              Description

              {activeTab === "description" && (
                <span className="absolute left-0 bottom-0 w-full h-[4px] rounded-full bg-primary"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("additional")}
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${
                activeTab === "additional"
                  ? "text-primary"
                  : "text-zinc-400 hover:text-primary"
              }`}
            >
              Additional Information

              {activeTab === "additional" && (
                <span className="absolute left-0 bottom-0 w-full h-[4px] rounded-full bg-primary"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("review")}
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${
                activeTab === "review"
                  ? "text-primary"
                  : "text-zinc-400 hover:text-primary"
              }`}
            >
              Review

              {activeTab === "review" && (
                <span className="absolute left-0 bottom-0 w-full h-[4px] rounded-full bg-primary"></span>
              )}
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div
          className="mt-14 lg:mt-16"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
        >

          {/* DESCRIPTION */}
          {activeTab === "description" && (
            <div className="max-w-[1100px] mx-auto">
              <p className="text-zinc-600 text-base md:text-lg lg:text-[20px] leading-8 lg:leading-[38px]">
                {product.description}
              </p>

              <div className="mt-8 space-y-4">
                {product.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 w-3 h-3 rounded-full bg-accent shrink-0"></span>

                    <p className="text-zinc-700 text-base md:text-lg">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDITIONAL */}
          {activeTab === "additional" && (
            <div className="max-w-[1100px] mx-auto overflow-hidden rounded-[30px] border border-zinc-200">
              <table className="w-full">
                <thead className="bg-accent">
                  <tr>
                    <th className="text-left py-5 px-6 md:px-8 text-base md:text-xl font-bold">
                      Feature
                    </th>
                    <th className="text-left py-5 px-6 md:px-8 text-base md:text-xl font-bold">
                      Description
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(
                    product.additionalInformation || {}
                  ).map(([key, value], index) => (
                    <tr
                      key={index}
                      className="border-t border-zinc-200"
                    >
                      <td className="py-5 px-6 md:px-8 font-semibold capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </td>

                      <td className="py-5 px-6 md:px-8 text-zinc-600">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* REVIEW */}
          {activeTab === "review" && (
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-12 lg:gap-14 pb-14 border-b border-zinc-200">

              <div className="flex flex-col items-center justify-center xl:border-r border-zinc-200">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  {product.rating}
                </h2>

                <p className="mt-2 text-zinc-500">
                  out of 5
                </p>

                <div className="flex gap-1 text-accent text-2xl mt-3">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className="ri-star-fill"
                    ></i>
                  ))}
                </div>

                <p className="mt-3 text-zinc-500">
                  Based on {product.totalReviews} reviews
                </p>
              </div>

              <div className="space-y-6">

                <div className="flex items-center gap-5">
                  <span className="w-[70px] text-zinc-600">
                    5 Star
                  </span>

                  <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div className="w-[82%] h-full bg-accent rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="w-[70px] text-zinc-600">
                    4 Star
                  </span>

                  <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div className="w-[55%] h-full bg-accent rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="w-[70px] text-zinc-600">
                    3 Star
                  </span>

                  <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div className="w-[30%] h-full bg-accent rounded-full"></div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductTabs;