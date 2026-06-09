import { FolderTree, CheckCircle, XCircle } from "lucide-react";
const CategoryStats = ({ categories }) => {
  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: FolderTree,
    },

    {
      title: "Active",
      value: categories.filter(
        (item) => item.status === "active"
      ).length,
      icon: CheckCircle,
    },

    {
      title: "Inactive",
      value: categories.filter(
        (item) => item.status === "inactive"
      ).length,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            bg-white
            p-6
            rounded-3xl
            border
            border-zinc-100
          "
          >
            <div className="flex justify-between">
              <div>
                <p className="text-zinc-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
              "
              >
                <Icon
                  className="text-primary"
                  size={22}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryStats;