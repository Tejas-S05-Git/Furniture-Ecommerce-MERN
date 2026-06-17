import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import PageHeader from "../../../components/common/PageHeader";
import Pagination from "../../../components/common/Pagination";
import DeleteModal from "../../../components/common/DeleteModal";
import EmptyState from "../../../components/common/EmptyState";

import ProductStats from "../../../components/products/ProductStats";
import ProductFilters from "../../../components/products/ProductFilters";
import ProductTable from "../../../components/products/ProductTable";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [stock, setStock] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =
        await api.get("/products");

      setProducts(
        response.data.products
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load products"
      );
    }
  };

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "all"
          ? true
          : product.category?.name === category;

      const matchesStock =
        stock === "all"
          ? true
          : stock === "instock"
            ? product.stock
            : !product.stock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });

  const totalPages = Math.ceil(
    filteredProducts.length /
    itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex +
      itemsPerPage
    );

    const handleDeleteProduct = async () => {
  try {
    await api.delete(
      `/products/${selectedProduct._id}`
    );

    setProducts(
      products.filter(
        (item) =>
          item._id !==
          selectedProduct._id
      )
    );

    toast.success(
      "Product deleted successfully"
    );

    setDeleteModal(false);
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to delete product"
    );
  }
};
  return (
    <div className="space-y-8">

      <PageHeader
        title="Products"
        subtitle="Manage furniture products"
        buttonText="Add Product"
        onButtonClick={() =>
          navigate(
            "/admin/products/add"
          )
        }
      />

      <ProductStats
        products={products}
      />

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        stock={stock}
        setStock={setStock}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No Products Found"
          description="Try changing your filters."
        />
      ) : (
        <ProductTable
          products={paginatedProducts}
          setDeleteModal={setDeleteModal}
          setSelectedProduct={setSelectedProduct}
        />
      )}


      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <DeleteModal
  open={deleteModal}
  onClose={() =>
    setDeleteModal(false)
  }
  title="Delete Product"
  onDelete={handleDeleteProduct}
/>

    </div>
  );
};

export default Products;