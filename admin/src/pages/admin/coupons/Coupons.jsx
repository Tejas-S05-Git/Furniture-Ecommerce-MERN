import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import EmptyState from "../../../components/common/EmptyState";
import Pagination from "../../../components/common/Pagination";
import DeleteModal from "../../../components/common/DeleteModal";

import CouponStats from "../../../components/coupons/CouponStats";
import CouponFilters from "../../../components/coupons/CouponFilters";
import CouponTable from "../../../components/coupons/CouponTable";

import couponsData from "../../../data/couponsData";

const Coupons = () => {
  const navigate =
    useNavigate();

  const [coupons, setCoupons] =
    useState(couponsData);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [type, setType] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [
    selectedCoupon,
    setSelectedCoupon,
  ] = useState(null);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const itemsPerPage = 5;

  /* Filters */

  const filteredCoupons =
    coupons.filter((coupon) => {
      const matchesSearch =
        coupon.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        !status ||
        coupon.status === status;

      const matchesType =
        !type ||
        coupon.discountType ===
          type;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });

  /* Pagination */

  const totalPages =
    Math.ceil(
      filteredCoupons.length /
        itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedCoupons =
    filteredCoupons.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );

  return (
    <div className="space-y-8">

      <PageHeader
        title="Coupons"
        subtitle="Manage discount coupons"
        buttonText="Add Coupon"
        onButtonClick={() =>
          navigate(
            "/admin/coupons/add"
          )
        }
      />

      <CouponStats
        coupons={coupons}
      />

      <CouponFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        type={type}
        setType={setType}
      />

      {filteredCoupons.length ===
      0 ? (
        <EmptyState
          title="No Coupons Found"
          description="Try changing your filters."
        />
      ) : (
        <>
          <CouponTable
            coupons={
              paginatedCoupons
            }
            setDeleteModal={
              setDeleteModal
            }
            setSelectedCoupon={
              setSelectedCoupon
            }
          />

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
                filteredCoupons.length
              )}{" "}
              of{" "}
              {
                filteredCoupons.length
              }{" "}
              coupons
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

      <DeleteModal
        open={deleteModal}
        onClose={() =>
          setDeleteModal(false)
        }
        title="Delete Coupon"
        onDelete={() => {
          setCoupons(
            coupons.filter(
              (coupon) =>
                coupon.id !==
                selectedCoupon.id
            )
          );

          setDeleteModal(false);
        }}
      />

    </div>
  );
};

export default Coupons;
