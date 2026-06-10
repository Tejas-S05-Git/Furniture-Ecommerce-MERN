import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  TicketPercent,
  Users,
  Star,
  Image,
  Settings,
  LogOut,
  LayoutGrid,
} from "lucide-react";

export const adminSidebarData = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
    ],
  },

  {
    title: "CATALOG",
    items: [
      {
        name: "Products",
        icon: Package,
        path: "/admin/products",
      },
      {
        name: "Categories",
        icon: FolderTree,
        path: "/admin/categories",
      },
    ],
  },

  {
    title: "SALES",
    items: [
      {
        name: "Orders",
        icon: ShoppingCart,
        path: "/admin/orders",
      },
      {
        name: "Coupons",
        icon: TicketPercent,
        path: "/admin/coupons",
      },
    ],
  },

  {
    title: "CUSTOMERS",
    items: [
      {
        name: "Customers",
        icon: Users,
        path: "/admin/customers",
      },
      {
        name: "Reviews",
        icon: Star,
        path: "/admin/reviews",
      },
    ],
  },

  {
    title: "MARKETING",
    items: [
      {
        name: "Hero Banners",
        icon: Image,
        path: "/admin/banners",
      },
      {
        name: "Category Banners",
        path: "/admin/category-banners",
        icon: LayoutGrid,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        name: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
      {
        name: "Logout",
        icon: LogOut,
        path: "/logout",
      },
    ],
  },
];
