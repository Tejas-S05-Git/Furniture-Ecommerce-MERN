import React from "react";
import {
  TicketPercent,
  BadgeCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

const CouponStats = ({ coupons }) => {
  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) =>
      coupon.status === "Active" &&
      new Date(coupon.expiryDate) >= new Date()
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => new Date(coupon.expiryDate) < new Date()
  ).length;

  const totalUses = coupons.reduce(
    (total, coupon) => total + (coupon.usedCount || 0),
    0
  );

  // Added semantic colors specific to promotional & coupon analytics
  const stats = [
    {
      title: "Total Coupons",
      value: totalCoupons,
      icon: TicketPercent,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      icon: BadgeCheck,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Expired Coupons",
      value: expiredCoupons,
      icon: Clock3,
      colors: "bg-rose-50 text-rose-600 border-rose-100", // Rose for expired/inactive promos
    },
    {
      title: "Total Uses",
      value: totalUses.toLocaleString("en-IN"), // Clean numerical formatting
      icon: TrendingUp,
      colors: "bg-purple-50 text-purple-600 border-purple-100", // Purple for growth/usage metrics
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default CouponStats;