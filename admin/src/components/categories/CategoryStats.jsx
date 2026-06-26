import React from "react";
import { FolderTree, CheckCircle, XCircle } from "lucide-react";

const CategoryStats = ({ categories }) => {
  // Logic remains identical, cleanly cached before the map loop
  const totalCategories = categories.length;
  const activeCategories = categories.filter((item) => item.status === "active").length;
  const inactiveCategories = categories.filter((item) => item.status === "inactive").length;

  // Consistent structure with previous stats cards
  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      icon: FolderTree,
      colors: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Active",
      value: activeCategories,
      icon: CheckCircle,
      colors: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Inactive",
      value: inactiveCategories,
      icon: XCircle,
      colors: "bg-zinc-100 text-zinc-600 border-zinc-200", // Gray tone for inactive/disabled stats
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

export default CategoryStats;