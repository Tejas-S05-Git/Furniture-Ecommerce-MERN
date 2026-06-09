import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";

import CategoryStats from "../../../components/categories/CategoryStats";
import CategoryFilters from "../../../components/categories/CategoryFilters";
import CategoryTable from "../../../components/categories/CategoryTable";

import { categoriesData } from "../../../data/categoriesData";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/common/DeleteModal";
import EmptyState from "../../../components/common/EmptyState";
const Categories = () => {

  const [search, setSearch] = useState("");
const [status, setStatus] = useState("all");

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

  const [deleteModal, setDeleteModal] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
const navigate = useNavigate();
  const filteredCategories =
  categoriesData.filter((category) => {
    const matchesSearch =
      category.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "all"
        ? true
        : category.status === status;

    return (
      matchesSearch &&
      matchesStatus
    );
  });
  const totalPages = Math.ceil(
  filteredCategories.length /
    itemsPerPage
);

const currentCategories =
  filteredCategories.slice(
    (currentPage - 1) *
      itemsPerPage,
    currentPage *
      itemsPerPage
  );

  return (
    <div className="space-y-8">

      <PageHeader
  title="Categories"
  subtitle="Manage all furniture categories"
  buttonText="Add Category"
  onButtonClick={() =>
    navigate("/admin/categories/add")
  }
/>

      <CategoryStats  categories={categoriesData} />

   <CategoryFilters
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
/>
{
  currentCategories.length === 0 ? (
    <EmptyState
      title="No Categories Found"
      description="Try changing your search or filters."
    />
  ) : (
    <CategoryTable
      categories={currentCategories}
      setDeleteModal={setDeleteModal}
      setSelectedCategory={setSelectedCategory}
    />
  )
}
<DeleteModal
  open={deleteModal}
  onClose={() => setDeleteModal(false)}
  onDelete={() => {
    console.log("Delete:", selectedCategory);
    setDeleteModal(false);
  }}
  title="Delete Category"
/>

      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
/>
    </div>
  );
};

export default Categories;