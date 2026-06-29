import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import EmptyState from "../../../components/common/EmptyState";
import Pagination from "../../../components/common/Pagination";
import DeleteModal from "../../../components/common/DeleteModal";
import SearchInput from "../../../components/common/SearchInput";

import HeroBannerStats from "../../../components/banners/HeroBannerStats";
import HeroBannerTable from "../../../components/banners/HeroBannerTable";

import heroBannersData from "../../../data/heroBannersData";
import { useEffect } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";

const HeroBanners = () => {
  const navigate =
    useNavigate();

  const [banners, setBanners] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchBanners = async () => {
    try {

      const res = await api.get("/hero-banners");

      setBanners(res.data.banners);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load banners");

    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedBanner, setSelectedBanner] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const filteredBanners =
    banners.filter((banner) =>
      banner.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPages =
    Math.ceil(
      filteredBanners.length /
      itemsPerPage
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedBanners =
    filteredBanners.slice(
      startIndex,
      startIndex +
      itemsPerPage
    );

  return (
    <div className="space-y-8">

      <PageHeader
        title="Hero Banners"
        subtitle="Manage homepage hero banners"
        buttonText="Add Banner"
        onButtonClick={() =>
          navigate(
            "/admin/banners/add"
          )
        }
      />

      <HeroBannerStats
        banners={banners}
      />

      <div
        className="
        bg-white
        p-6
        rounded-3xl
        border
        border-zinc-100
        "
      >
        <SearchInput
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search banner..."
        />
      </div>

      {filteredBanners.length ===
        0 ? (
        <EmptyState
          title="No Banners Found"
          description="Try changing your search."
        />
      ) : (
        <>
          <HeroBannerTable
            banners={
              paginatedBanners
            }
            setDeleteModal={
              setDeleteModal
            }
            setSelectedBanner={
              setSelectedBanner
            }
          />

          <div
            className="
            flex
            flex-col
            sm:flex-row
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
                filteredBanners.length
              )}{" "}
              of{" "}
              {
                filteredBanners.length
              }{" "}
              banners
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
        title="Delete Banner"
        onDelete={async () => {

          try {

            await api.delete(
              `/hero-banners/${selectedBanner._id}`
            );

            toast.success(
              "Banner deleted successfully"
            );

            setDeleteModal(false);

            fetchBanners();

          } catch (error) {

            toast.error(
              error.response?.data?.message ||
              "Delete failed"
            );

          }

        }}
      />
    </div>
  );
};

export default HeroBanners;