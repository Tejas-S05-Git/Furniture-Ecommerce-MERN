import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingCart,
  TicketPercent,
  Users,
  Star,
  Image,
  Settings,
  Shield,
  UserCog,
  ClipboardList,
  LogOut,
} from "lucide-react";

export const superAdminSidebarData = [
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
      {
        name: "Inventory",
        icon: Boxes,
        path: "/admin/inventory",
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
        name: "Banners",
        icon: Image,
        path: "/admin/banners",
      },
    ],
  },
   {
  title: "ADMINISTRATION",
  items: [
    {
      name: "Admins",
      icon: UserCog,
      path: "/sa/admins",
    },
    {
      name: "Roles",
      icon: Shield,
      path: "/sa/roles",
    },
    {
      name: "Activity Logs",
      icon: ClipboardList,
      path: "/sa/activity-logs",
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