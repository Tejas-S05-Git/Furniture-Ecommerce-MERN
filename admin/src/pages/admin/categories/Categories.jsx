import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import CategoryStats from "../../../components/categories/CategoryStats";
import CategoryFilters from "../../../components/categories/CategoryFilters";
import CategoryTable from "../../../components/categories/CategoryTable";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/common/DeleteModal";
import EmptyState from "../../../components/common/EmptyState";
import { useEffect } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
const Categories = () => {

  const [categories, setCategories] =useState([]);

  useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response =
      await api.get("/categories");

    console.log(response.data);

    setCategories(
      response.data.categories
    );
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteCategory =
  async () => {
    try {
      await api.delete(
        `/categories/${selectedCategory._id}`
      );

      setCategories((prev) =>
        prev.filter(
          (item) =>
            item._id !==
            selectedCategory._id
        )
      );

      toast.success(
        "Category deleted successfully"
      );

      setDeleteModal(false);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to delete category"
      );
    }
  };

  const [search, setSearch] = useState("");
const [status, setStatus] = useState("all");

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

  const [deleteModal, setDeleteModal] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
const navigate = useNavigate();
  const filteredCategories =
  categories.filter((category) => {
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

  useEffect(() => {
  fetchCategories();
}, []);
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

     <CategoryStats categories={categories} />

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
  onDelete={handleDeleteCategory}
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