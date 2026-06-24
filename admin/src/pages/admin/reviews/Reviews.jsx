
import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";
import DeleteModal from "../../../components/common/DeleteModal";

import ReviewStats from "../../../components/reviews/ReviewStats";
import ReviewFilters from "../../../components/reviews/ReviewFilters";
import ReviewTable from "../../../components/reviews/ReviewTable";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";

const Reviews = () => {

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [rating, setRating] = useState("");

  const [status, setStatus] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedReview, setSelectedReview] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchReviews = async () => {
    try {
      const response =
        await api.get("/reviews");

      setReviews(
        response.data.reviews
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* Filters */

  const filteredReviews =
    reviews.filter((review) => {
      const matchesSearch =
        `${review.customer?.firstName || ""}
   ${review.customer?.lastName || ""}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        review.product?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRating =
        !rating ||
        review.rating ===
        Number(rating);

      const matchesStatus =
        !status ||
        (status === "approved"
          ? review.approved === true
          : status === "pending"
            ? review.approved === false
            : true)

      return (
        matchesSearch &&
        matchesRating &&
        matchesStatus
      );
    });

  /* Pagination */

  const totalPages =
    Math.ceil(
      filteredReviews.length /
      itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedReviews =
    filteredReviews.slice(
      startIndex,
      startIndex +
      itemsPerPage
    );

  /* Actions */

  const handleApprove =
    async (id) => {
      try {
        await api.patch(
          `/reviews/${id}/approve`
        );

        toast.success(
          "Review Updated"
        );

        fetchReviews();
      } catch (error) {
        toast.error(
          "Failed to update review"
        );
      }
    };

  const handleReject =
    async (id) => {
      try {
        await api.patch(
          `/reviews/${id}/approve`
        );

        toast.success(
          "Review Updated"
        );

        fetchReviews();
      } catch (error) {
        toast.error(
          "Failed to update review"
        );
      }
    };

  return (
    <div className="space-y-8">

      {/* Header */}

      <PageHeader
        title="Reviews"
        subtitle="Manage customer reviews and ratings"
      />

      {/* Stats */}

      <ReviewStats
        reviews={reviews}
      />

      {/* Filters */}

      <ReviewFilters
        search={search}
        setSearch={setSearch}
        rating={rating}
        setRating={setRating}
        status={status}
        setStatus={setStatus}
      />

      {/* Table */}

      {filteredReviews.length ===
        0 ? (
        <EmptyState
          title="No Reviews Found"
          description="Try changing your filters."
        />
      ) : (
        <>
          <ReviewTable
            reviews={
              paginatedReviews
            }
            setDeleteModal={
              setDeleteModal
            }
            setSelectedReview={
              setSelectedReview
            }
            handleApprove={
              handleApprove
            }
            handleReject={
              handleReject
            }
          />

          {/* Showing Results */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            "
          >
            <p
              className="
              text-sm
              text-zinc-500
              "
            >
              Showing{" "}
              {startIndex + 1}
              -
              {Math.min(
                startIndex +
                itemsPerPage,
                filteredReviews.length
              )}{" "}
              of{" "}
              {
                filteredReviews.length
              }{" "}
              reviews
            </p>

            <Pagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              setCurrentPage={
                setCurrentPage
              }
            />
          </div>
        </>
      )}

      {/* Delete */}

      <DeleteModal
        open={deleteModal}
        onClose={() =>
          setDeleteModal(false)
        }
        title="Delete Review"
       onDelete={async () => {
  try {
    await api.delete(
      `/reviews/${selectedReview._id}`
    );

    toast.success(
      "Review Deleted"
    );

    fetchReviews();

    setDeleteModal(false);
  } catch (error) {
    toast.error(
      "Delete Failed"
    );
  }
}}
      />
    </div>
  );
};

export default Reviews;