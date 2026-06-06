import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

export const statsData = [
  {
    title: "Revenue",
    value: 245000,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: 128,
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: 86,
    icon: Users,
  },
  {
    title: "Products",
    value: 324,
    icon: Package,
  },
];

export const revenueData = [
  { month: "Jan", revenue: 15000 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 28000 },
  { month: "Apr", revenue: 35000 },
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 51000 },
];

export const ordersData = [
  { name: "Pending", value: 12 },
  { name: "Processing", value: 18 },
  { name: "Delivered", value: 80 },
  { name: "Cancelled", value: 5 },
];

export const recentOrders = [
  {
    id: "#ORD001",
    customer: "Tejas",
    amount: "₹12,500",
    status: "Delivered",
  },
  {
    id: "#ORD002",
    customer: "Aniket",
    amount: "₹8,500",
    status: "Processing",
  },
];

export const topProducts = [
  {
    name: "Wooden Chair",
    sales: 120,
    revenue: "₹60,000",
  },
  {
    name: "Luxury Sofa",
    sales: 95,
    revenue: "₹95,000",
  },
];

export const lowStockProducts = [
  {
    name: "Dining Table",
    stock: 5,
  },
  {
    name: "Office Chair",
    stock: 8,
  },
];