import {
  LayoutGrid,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";

const CategoryBannerStats = ({
  banners,
}) => {
  const totalCategories =
    banners.length;

  const activeCategories =
    banners.filter(
      (banner) =>
        banner.status ===
        "Active"
    ).length;

  const inactiveCategories =
    banners.filter(
      (banner) =>
        banner.status ===
        "Inactive"
    ).length;

  const totalProducts =
    banners.reduce(
      (total, banner) =>
        total +
        banner.itemsCount,
      0
    );

  const stats = [
    {
      title:
        "Total Categories",
      value:
        totalCategories,
      icon: LayoutGrid,
    },

    {
      title:
        "Active Categories",
      value:
        activeCategories,
      icon: CheckCircle,
    },

    {
      title:
        "Inactive Categories",
      value:
        inactiveCategories,
      icon: XCircle,
    },

    {
      title:
        "Total Products",
      value:
        totalProducts.toLocaleString(),
      icon: Package,
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
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="
                  text-sm
                  text-zinc-500
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

export default CategoryBannerStats;