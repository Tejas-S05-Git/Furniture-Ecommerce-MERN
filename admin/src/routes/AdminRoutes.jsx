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
import Orders from "../pages/admin/orders/Orders";
import ViewOrder from "../pages/admin/orders/ViewOrder";
import Customers from "../pages/admin/customers/Customers";
import ViewCustomer from "../pages/admin/customers/ViewCustomer";
import Reviews from "../pages/admin/reviews/Reviews";
import ViewReview from "../pages/admin/reviews/ViewReview";
import Coupons from "../pages/admin/coupons/Coupons";
import AddCoupon from "../pages/admin/coupons/AddCoupon";
import EditCoupon from "../pages/admin/coupons/EditCoupon";
import HeroBanners from "../pages/admin/banners/HeroBanners";
import AddHeroBanner from "../pages/admin/banners/AddHeroBanner";
import EditHeroBanner from "../pages/admin/banners/EditHeroBanner";
import CategoryBanners from "../pages/admin/banners/CategoryBanners";
import AddCategoryBanner from "../pages/admin/banners/AddCategoryBanner";
import EditCategoryBanner from "../pages/admin/banners/EditCategoryBanner";
import Settings from "../pages/admin/settings/Settings";

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
        <Route path="orders" element={<Orders />} />
        <Route path="orders/view/:id" element={<ViewOrder />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/view/:id" element={<ViewCustomer />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/view/:id" element={<ViewReview />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="coupons/add" element={<AddCoupon />} />
        <Route path="coupons/edit/:id" element={<EditCoupon />} />
        <Route path="banners" element={<HeroBanners />} />
        <Route path="banners/add" element={<AddHeroBanner />} />
        <Route path="banners/edit/:id" element={<EditHeroBanner />} />
        <Route path="category-banners" element={<CategoryBanners />}/>
        <Route path="category-banners/add" element={<AddCategoryBanner />}/>
        <Route path="category-banners/edit/:id" element={<EditCategoryBanner />}/>
        <Route path="settings" element={<Settings />}/>





        


      </Route>
    </Routes>
  );
};

export default AdminRoutes;