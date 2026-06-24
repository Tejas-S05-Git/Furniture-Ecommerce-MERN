import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";
import toast from "react-hot-toast";
const ProductTabs = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const fetchProduct = async () => {
    try {
      const response =
        await api.get(
          `/products/${id}`
        );

      setProduct(
        response.data.product
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews =
    async () => {
      try {
        const response =
          await api.get(
            `/reviews/product/${id}`
          );

        setReviews(
          response.data.reviews
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product]);

  const handleReviewSubmit =

  
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          "/reviews",
          {
            productId: product._id,
            rating,
            comment,
            title,
          }
        );

        toast.success(
          "Review Submitted Successfully"
        );

        setRating(5);
        setComment("");
        setTitle("");

        fetchReviews();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
          "Failed to submit review"
        );
      }
    };
  const averageRating =
    reviews.length > 0
      ? (
        reviews.reduce(
          (acc, review) =>
            acc + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)
      : 0;

  const [activeTab, setActiveTab] = useState("description");


  const totalReviews =
    reviews.length;

  const fiveStar =
    reviews.filter(
      (review) =>
        review.rating === 5
    ).length;

  const fourStar =
    reviews.filter(
      (review) =>
        review.rating === 4
    ).length;

  const threeStar =
    reviews.filter(
      (review) =>
        review.rating === 3
    ).length;

  const twoStar =
    reviews.filter(
      (review) =>
        review.rating === 2
    ).length;

  const oneStar =
    reviews.filter(
      (review) =>
        review.rating === 1
    ).length;

  const getPercentage = (
    count
  ) =>
    totalReviews > 0
      ? (
        (count /
          totalReviews) *
        100
      ).toFixed(0)
      : 0;


  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }
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
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${activeTab === "description"
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
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${activeTab === "additional"
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
              className={`relative pb-6 whitespace-nowrap text-[18px] sm:text-[24px] lg:text-[32px] font-bold transition-all duration-300 ${activeTab === "review"
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
                  ).length > 0 ? (
                    Object.entries(
                      product.additionalInformation
                    ).map(([key, value], index) => (
                      <tr
                        key={index}
                        className="border-t border-zinc-200"
                      >
                        <td className="py-5 px-6 md:px-8 font-semibold capitalize">
                          {key.replace(
                            /([A-Z])/g,
                            " $1"
                          )}
                        </td>

                        <td className="py-5 px-6 md:px-8 text-zinc-600">
                          {value || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="
        py-10
        text-center
        text-zinc-500
        "
                      >
                        No Additional Information Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* REVIEW */}
          {activeTab === "review" && (
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-12 lg:gap-14 pb-14 border-b border-zinc-200">

              <div className="flex flex-col items-center justify-center xl:border-r border-zinc-200">
                <h2 className="text-5xl lg:text-6xl font-bold">
                  {averageRating}

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
                  Based on {reviews.length} reviews
                </p>
              </div>

              <div className="space-y-6">

                {[
                  {
                    star: 5,
                    count: fiveStar,
                  },
                  {
                    star: 4,
                    count: fourStar,
                  },
                  {
                    star: 3,
                    count: threeStar,
                  },
                  {
                    star: 2,
                    count: twoStar,
                  },
                  {
                    star: 1,
                    count: oneStar,
                  },
                ].map((item) => (
                  <div
                    key={item.star}
                    className="
    flex
    items-center
    gap-5
    "
                  >
                    <span className="w-[70px] text-zinc-600">
                      {item.star} Star
                    </span>

                    <div
                      className="
      flex-1
      h-2
      rounded-full
      bg-zinc-200
      overflow-hidden
      "
                    >
                      <div
                        className="
        h-full
        bg-accent
        rounded-full
        transition-all
        duration-500
        "
                        style={{
                          width: `${getPercentage(
                            item.count
                          )}%`,
                        }}
                      />
                    </div>

                    <span
                      className="
      w-12
      text-sm
      text-zinc-500
      "
                    >
                      {item.count}
                    </span>
                  </div>
                ))}

                <div className="mt-12 space-y-5">
                  {reviews.length === 0 ? (
                    <div className="text-center py-10">
                      No Reviews Yet
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="
        bg-secondary
        rounded-3xl
        p-6
        border
        border-zinc-100
        "
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">
                              {review.customer?.firstName}
                              {" "}
                              {review.customer?.lastName}
                            </h4>

                            <p className="text-sm text-zinc-500">
                              {new Date(
                                review.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="text-accent">
                            {"⭐".repeat(
                              review.rating
                            )}
                          </div>
                        </div>

                        <h5 className="font-semibold mt-3">
                          {review.title}
                        </h5>

                        <p className="mt-2 text-zinc-600">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <form
                  onSubmit={handleReviewSubmit}
                  className="
  mt-12
  bg-secondary
  rounded-3xl
  p-8
  space-y-5
  "
                >
                  <h3 className="text-2xl font-bold">
                    Write A Review
                  </h3>

                  <select
                    value={rating}
                    onChange={(e) =>
                      setRating(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="border rounded-xl px-4 py-3"
                  >
                    <option value="5">
                      5 Star
                    </option>
                    <option value="4">
                      4 Star
                    </option>
                    <option value="3">
                      3 Star
                    </option>
                    <option value="2">
                      2 Star
                    </option>
                    <option value="1">
                      1 Star
                    </option>
                  </select>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    placeholder="Review Title"
                    className="
  w-full
  h-14
  px-5
  border
  border-zinc-200
  rounded-2xl
  outline-none
  "
                  />

                  <textarea
                    value={comment}
                    onChange={(e) =>
                      setComment(
                        e.target.value
                      )
                    }
                    rows="5"
                    placeholder="Write your review..."
                    className="w-full border rounded-2xl p-4"
                  />

                  <button
                    type="submit"
                    className="
  bg-primary
  text-white
  h-14
  px-10
  rounded-full
  font-semibold
  hover:opacity-90
  transition-all
  "
                  >
                    Submit Review
                  </button>
                </form>

              </div>


            </div>

          )}

        </div>
      </div>
    </section>
  );
};

export default ProductTabs;