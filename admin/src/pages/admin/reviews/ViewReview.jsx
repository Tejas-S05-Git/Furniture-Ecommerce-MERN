import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  User,
  Package,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import reviewsData from "../../../data/reviewsData";
import StatusBadge from "../../../components/common/StatusBadge";
import { useState } from "react";

const ViewReview = () => {
    
  const { id } = useParams();

  const navigate = useNavigate();

  const review = reviewsData.find(
    (item) =>
      item.id === Number(id)
  );

  if (!review) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        p-10
        text-center
        "
      >
        Review Not Found
      </div>
    );
  }
  const [reviewStatus, setReviewStatus] =useState(review.status);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        "
      >
        <div>
          <button
            onClick={() =>
              navigate(-1)
            }
            className="
            flex
            items-center
            gap-2
            text-primary
            mb-3
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Review Details
          </h1>

          <p className="text-zinc-500">
            Review #{review.id}
          </p>
        </div>

        <StatusBadge
          status={reviewStatus}
        />
      </div>

      {/* Main Grid */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >
        {/* Left Side */}

        <div className="space-y-6">

          {/* Customer */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <User
                size={20}
                className="text-primary"
              />

              <h2 className="font-semibold text-lg">
                Customer
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={
                  review.customer.avatar
                }
                alt=""
                className="
                w-16
                h-16
                rounded-full
                object-cover
                "
              />

              <div>
                <h3 className="font-medium">
                  {
                    review.customer.name
                  }
                </h3>

                <p className="text-zinc-500 text-sm">
                  Customer
                </p>
              </div>
            </div>
          </div>

          {/* Product */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <Package
                size={20}
                className="text-primary"
              />

              <h2 className="font-semibold text-lg">
                Product
              </h2>
            </div>

            <div className="flex gap-4">
              <img
                src={
                  review.product.image
                }
                alt=""
                className="
                w-20
                h-20
                rounded-2xl
                object-cover
                "
              />

              <div>
                <h3 className="font-medium">
                  {
                    review.product.title
                  }
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  Product ID:
                  {" "}
                  {
                    review.product.id
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Date */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <div className="flex items-center gap-3">
              <Calendar
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-zinc-500 text-sm">
                  Review Date
                </p>

                <h3 className="font-medium">
                  {review.date}
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side */}

        <div
          className="
          xl:col-span-2
          space-y-6
          "
        >
          {/* Rating */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              mb-6
              "
            >
              Rating
            </h2>

            <div className="flex items-center gap-2 text-3xl">
              {Array.from({
                length:
                  review.rating,
              }).map(
                (_, index) => (
                  <span
                    key={index}
                  >
                    ⭐
                  </span>
                )
              )}
            </div>

            <p className="mt-3 text-zinc-500">
              {
                review.rating
              }{" "}
              out of 5 stars
            </p>
          </div>

          {/* Review Content */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare
                size={20}
                className="text-primary"
              />

              <h2 className="text-xl font-semibold">
                Review
              </h2>
            </div>

            <div
              className="
              bg-secondary
              rounded-2xl
              p-5
              "
            >
              <p
                className="
                leading-7
                text-zinc-700
                "
              >
                {
                  review.review
                }
              </p>
            </div>
          </div>

          {/* Actions */}

          <div
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              mb-6
              "
            >
              Moderation Actions
            </h2>

            <div
              className="
              flex
              flex-col
              sm:flex-row
              gap-4
              "
            >
             <button
  onClick={() => {
    setReviewStatus(
      "Approved"
    );

    toast.success(
      "Review Approved"
    );
  }}
  className="
  flex-1
  flex
  items-center
  justify-center
  gap-2
  bg-green-500
  text-white
  py-3
  rounded-2xl
  "
>
  <CheckCircle
    size={18}
  />

  Approve
</button>
<button
  onClick={() => {
    setReviewStatus(
      "Rejected"
    );

    toast.success(
      "Review Rejected"
    );
  }}
  className="
  flex-1
  flex
  items-center
  justify-center
  gap-2
  bg-yellow-500
  text-white
  py-3
  rounded-2xl
  "
>

                <XCircle
                  size={18}
                />

                Reject
              </button>

             <button
  onClick={() => {
    toast.success(
      "Review Deleted"
    );

    navigate(
      "/admin/reviews"
    );
  }}
  className="
  flex-1
  flex
  items-center
  justify-center
  gap-2
  bg-red-500
  text-white
  py-3
  rounded-2xl
  "
>
                <Trash2
                  size={18}
                />

                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewReview;