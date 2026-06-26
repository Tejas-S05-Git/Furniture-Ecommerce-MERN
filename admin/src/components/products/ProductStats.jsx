import React from "react";
import {
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const ProductStats = ({ products }) => {
  // Pre-calculating values for cleaner mapping
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.quantity > 0).length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const lowStock = products.filter((p) => p.quantity > 0 && p.quantity < 10).length;

  // Added industry-standard semantic colors for inventory status
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      colors: "bg-blue-50 text-blue-600 border-blue-100", // Blue for neutral information
    },
    {
      title: "In Stock",
      value: inStock,
      icon: CheckCircle,
      colors: "bg-green-50 text-green-600 border-green-100", // Green for healthy status
    },
    {
      title: "Out Of Stock",
      value: outOfStock,
      icon: XCircle,
      colors: "bg-rose-50 text-rose-600 border-rose-100", // Rose/Red for critical status
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      colors: "bg-orange-50 text-orange-600 border-orange-100", // Orange for warning/attention
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

export default ProductStats;