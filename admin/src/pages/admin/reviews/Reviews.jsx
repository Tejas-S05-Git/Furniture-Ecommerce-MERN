import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";
import DeleteModal from "../../../components/common/DeleteModal";

import ReviewStats from "../../../components/reviews/ReviewStats";
import ReviewFilters from "../../../components/reviews/ReviewFilters";
import ReviewTable from "../../../components/reviews/ReviewTable";

import reviewsData from "../../../data/reviewsData";

const Reviews = () => {
  const [reviews, setReviews] =
    useState(reviewsData);

  const [search, setSearch] =
    useState("");

  const [rating, setRating] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  /* Filters */

  const filteredReviews =
    reviews.filter((review) => {
      const matchesSearch =
        review.customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        review.product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRating =
        !rating ||
        review.rating ===
          Number(rating);

      const matchesStatus =
        !status ||
        review.status ===
          status;

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

  const handleApprove = (
    id
  ) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                "Approved",
            }
          : review
      )
    );
  };

  const handleReject = (
    id
  ) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                "Rejected",
            }
          : review
      )
    );
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
        onDelete={() => {
          setReviews(
            reviews.filter(
              (review) =>
                review.id !==
                selectedReview.id
            )
          );

          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Reviews;