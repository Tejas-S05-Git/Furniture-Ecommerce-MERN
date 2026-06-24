import {
  Eye,
  Check,
  X,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const ReviewTable = ({
  reviews,
  setDeleteModal,
  setSelectedReview,
  handleApprove,
  handleReject,
}) => {
  const navigate =
    useNavigate();

  const columns = [
    "Product",
    "Customer",
    "Rating",
    "Review",
    "Status",
    "Date",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={reviews}
      renderRow={(review) => (
        <tr
          key={review._id}
          className="
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition
          "
        >
          {/* Product */}

          <td className="px-6 py-4 min-w-[260px]">
            <div className="flex items-center gap-4">

              <img
                src={
                  review.product?.thumbnail ||
                  "/images/no-image.png"
                }
                alt=""
                className="
  w-14
  h-14
  rounded-xl
  object-cover
  "
              />

              <div>
                <h3
                  className="
                  font-medium
                  text-zinc-800
                  "
                >
                  {
                    review.product.title
                  }
                </h3>

                <p
                  className="
                  text-xs
                  text-zinc-500
                  "
                >
                  Product ID:
                  {" "}
                  {
                    review.product?._id
                      ?.slice(-8)
                  }
                </p>
              </div>

            </div>
          </td>

          {/* Customer */}

          <td className="px-6 py-4 min-w-[220px]">
            <div className="flex items-center gap-3">

              <div
                className="
  w-10
  h-10
  rounded-full
  bg-primary
  text-white
  flex
  items-center
  justify-center
  font-semibold
  "
              >
                {review.customer?.firstName?.charAt(0)}
              </div>

              <span className="font-medium">
                {
                  `${review.customer?.firstName}
 ${review.customer?.lastName}`
                }
              </span>

            </div>
          </td>

          {/* Rating */}

          <td className="px-6 py-4">
            <div
              className="
              flex
              items-center
              gap-1
              "
            >
              ⭐
              {
                review.rating
              }
            </div>
          </td>

          {/* Review */}

          <td className="px-6 py-4 min-w-[320px]">
            <p
              className="
              text-sm
              text-zinc-600
              line-clamp-2
              "
            >
              {
                review.comment
              }
            </p>
          </td>

          {/* Status */}

          <td className="px-6 py-4">
            <StatusBadge
              status={
                review.approved
                  ? "approved"
                  : "pending"
              }
            />
          </td>

          {/* Date */}

          <td className="px-6 py-4 whitespace-nowrap">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </td>

          {/* Actions */}

          <td className="px-6 py-4">
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              {/* View */}

              <button
                title="View Review"
                className="
                p-2
                rounded-xl
                hover:bg-primary/10
                transition
                "
                onClick={() =>
                  navigate(
                    `/admin/reviews/view/${review._id}`
                  )
                }
              >
                <Eye
                  size={18}
                  className="text-primary"
                />
              </button>

              {/* Approve */}

              <button
                title="Approve"
                className="
                p-2
                rounded-xl
                hover:bg-green-100
                transition
                "
                onClick={() =>
                  handleApprove(
                    review._id
                  )
                }
              >
                <Check
                  size={18}
                  className="text-green-600"
                />
              </button>

              {/* Reject */}

              <button
                title="Reject"
                className="
                p-2
                rounded-xl
                hover:bg-yellow-100
                transition
                "
                onClick={() =>
                  handleReject(
                    review._id
                  )
                }
              >
                <X
                  size={18}
                  className="text-yellow-600"
                />
              </button>

              {/* Delete */}

              <button
                title="Delete"
                className="
                p-2
                rounded-xl
                hover:bg-red-100
                transition
                "
                onClick={() => {
                  setSelectedReview(
                    review
                  );

                  setDeleteModal(
                    true
                  );
                }}
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default ReviewTable;