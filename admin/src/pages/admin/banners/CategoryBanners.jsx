import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import EmptyState from "../../../components/common/EmptyState";
import DeleteModal from "../../../components/common/DeleteModal";
import SearchInput from "../../../components/common/SearchInput";



import categoryBannersData from "../../../data/categoryBannersData";
import CategoryBannerStats from "../../../components/banners/CategoryBannerStats";
import CategoryBannerTable from "../../../components/banners/CategoryBannerTable";

const CategoryBanners = () => {
  const navigate =
    useNavigate();

  const [banners, setBanners] =
    useState(
      categoryBannersData
    );

  const [search, setSearch] =
    useState("");

  const [
    deleteModal,
    setDeleteModal,
  ] = useState(false);

  const [
    selectedBanner,
    setSelectedBanner,
  ] = useState(null);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

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
        title="Category Banners"
        subtitle="Manage homepage category banners"
        buttonText="Add Category Banner"
        onButtonClick={() =>
          navigate(
            "/admin/category-banners/add"
          )
        }
      />

      <CategoryBannerStats
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
          placeholder="Search category..."
        />
      </div>

      {filteredBanners.length ===
      0 ? (
        <EmptyState
          title="No Category Banners Found"
          description="Try changing your search."
        />
      ) : (
        <>
          <CategoryBannerTable
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
              categories
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
        title="Delete Category Banner"
        onDelete={() => {
          setBanners(
            banners.filter(
              (banner) =>
                banner.id !==
                selectedBanner.id
            )
          );

          setDeleteModal(false);
        }}
      />
    </div>
  );
};

export default CategoryBanners;