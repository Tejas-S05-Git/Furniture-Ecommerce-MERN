import {
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const ProductStats = ({
  products,
}) => {
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
    },

    {
      title: "In Stock",
      value: products.filter(
        (p) => p.quantity > 0
      ).length,
      icon: CheckCircle,
    },

    {
      title: "Out Of Stock",
      value: products.filter(
        (p) => p.quantity === 0
      ).length,
      icon: XCircle,
    },

    {
      title: "Low Stock",
      value: products.filter(
        (p) =>
          p.quantity > 0 &&
          p.quantity < 10
      ).length,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            bg-white
            rounded-3xl
            border
            p-6
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
                  size={22}
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductStats;