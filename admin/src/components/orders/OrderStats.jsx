import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";
import React from "react";

const OrderStats = ({ orders }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.orderStatus !== "cancelled")
    .reduce((acc, order) => acc + order.totalAmount, 0);

  // Added specific colors for visual hierarchy and quick scannability
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
      colors: "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Truck,
      colors: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`, // en-IN ensures proper Indian comma placement
      icon: IndianRupee,
      colors: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group
              bg-white
              rounded-2xl
              border
              border-zinc-200
              p-5
              shadow-sm
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
              ease-out
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-zinc-900 group-hover:text-primary transition-colors duration-300">
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  transition-colors
                  duration-300
                  ${item.colors}
                `}
              >
                <Icon size={22} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;