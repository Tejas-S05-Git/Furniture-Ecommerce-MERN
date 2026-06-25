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
import StatusBadge from "../../../components/common/StatusBadge";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const ViewReview = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [review, setReview] = useState(null);


  const [loading, setLoading] = useState(true);

  const [reviewStatus, setReviewStatus] =
    useState("");

  useEffect(() => {
    if (review) {
      setReviewStatus(
        review.approved
          ? "approved"
          : "pending"
      );
    }
  }, [review]);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const response =
        await api.get(
          `/reviews/${id}`
        );

      setReview(
        response.data.review
      );
    } catch (error) {
      toast.error(
        "Review not found"
      );

      navigate("/admin/reviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!review) return null;


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
              <div
                className="
  w-16
  h-16
  rounded-full
  bg-primary
  text-white
  flex
  items-center
  justify-center
  text-xl
  font-semibold
  "
              >
                {review.customer?.firstName?.charAt(0)}
              </div>

              <div>
                <h3 className="font-medium">
                  {review.customer?.firstName}
                  {" "}
                  {review.customer?.lastName}
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
                  review.product?.thumbnail
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
                    review.product?._id.slice(-8)
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
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
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
                  review.comment
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
                onClick={async () => {
  try {
    await api.patch(
      `/reviews/${review._id}/approve`
    );

    fetchReview();

    toast.success(
      "Review Updated"
    );
  } catch {
    toast.error(
      "Failed"
    );
  }
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
               onClick={async () => {
  try {
    await api.delete(
      `/reviews/${review._id}`
    );

    toast.success(
      "Review Deleted"
    );

    navigate(
      "/admin/reviews"
    );
  } catch {
    toast.error(
      "Delete Failed"
    );
  }
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