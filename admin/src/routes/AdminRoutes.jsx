import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/admin/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/categories/Categories";
import AddCategory from "../pages/admin/categories/AddCategory";
import EditCategory from "../pages/admin/categories/EditCategory";
import ViewCategory from "../pages/admin/categories/ViewCategory";
import Products from "../pages/admin/products/Products";
import AddProduct from "../pages/admin/products/AddProduct";
import EditProduct from "../pages/admin/products/EditProduct";
import ProductDetails from "../pages/admin/products/ProductDetails";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        <Route path="categories/view/:id" element={<ViewCategory />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/view/:id" element={<ProductDetails />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;