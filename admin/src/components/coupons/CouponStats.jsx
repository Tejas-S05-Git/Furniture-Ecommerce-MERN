import {
  TicketPercent,
  BadgeCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

const CouponStats = ({
  coupons,
}) => {
  const totalCoupons =
    coupons.length;

  const activeCoupons =
    coupons.filter(
      (coupon) =>
        coupon.status ===
        "Active"
    ).length;

  const expiredCoupons =
    coupons.filter(
      (coupon) =>
        coupon.status ===
        "Expired"
    ).length;

  const totalUses =
    coupons.reduce(
      (total, coupon) =>
        total +
        coupon.usedCount,
      0
    );

  const stats = [
    {
      title:
        "Total Coupons",
      value:
        totalCoupons,
      icon: TicketPercent,
    },

    {
      title:
        "Active Coupons",
      value:
        activeCoupons,
      icon: BadgeCheck,
    },

    {
      title:
        "Expired Coupons",
      value:
        expiredCoupons,
      icon: Clock3,
    },

    {
      title:
        "Total Uses",
      value:
        totalUses,
      icon: TrendingUp,
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-6
      "
    >
      {stats.map((item) => {
        const Icon =
          item.icon;

        return (
          <div
            key={
              item.title
            }
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
                  {
                    item.title
                  }
                </p>

                <h2
                  className="
                  text-3xl
                  font-bold
                  mt-2
                  "
                >
                  {
                    item.value
                  }
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

export default CouponStats;