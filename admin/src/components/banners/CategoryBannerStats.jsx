import React from "react";
import {
  LayoutGrid,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";

const CategoryBannerStats = ({ banners }) => {
  const totalCategories = banners.length;

  const activeCategories = banners.filter(
  (banner) => banner.status === "Active"
).length;

const inactiveCategories = banners.filter(
  (banner) => banner.status === "Inactive"
).length;

  const totalProducts = banners.reduce(
    (total, banner) => total + Number(banner.itemsCount || 0),
    0
  );

  // Mapped semantic designs perfectly customized to fit within the overall system style guide
  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      icon: LayoutGrid,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Active Categories",
      value: activeCategories,
      icon: CheckCircle,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Inactive Categories",
      value: inactiveCategories,
      icon: XCircle,
      colors: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString("en-IN"), // Structured localized number separators
      icon: Package,
      colors: "bg-purple-50 text-purple-600 border-purple-100",
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

export default CategoryBannerStats;