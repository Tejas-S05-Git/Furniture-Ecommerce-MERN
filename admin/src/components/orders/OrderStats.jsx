import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
   IndianRupee,
} from "lucide-react";
import api from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";
const OrderStats = ({ orders }) => {

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.orderStatus === "processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.orderStatus === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.orderStatus === "delivered"
  ).length;

  const totalRevenue = orders
  .filter(
    (order) => order.orderStatus !== "cancelled"
  )
  .reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
    },
    {
      title: "Processing",
      value: processingOrders,
      icon: Truck,
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee
    }
  ];
  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-5
      gap-6
      "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            bg-white
            rounded-3xl
            border
            border-zinc-100
            p-6
            shadow-sm
            hover:shadow-md
            transition-all
            duration-300
            "
          >
            <div className="flex justify-between items-start">
              <div>
                <p
                  className="
                  text-zinc-500
                  text-sm
                  "
                >
                  {item.title}
                </p>

                <h2
                  className="
                  text-3xl
                  font-bold
                  mt-2
                  "
                >
                  {item.value}
                </h2>
              </div>

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
                "
              >
                <Icon
                  size={24}
                  className="
                  text-primary
                  "
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStats;