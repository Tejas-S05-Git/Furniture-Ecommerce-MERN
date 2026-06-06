import { AlertTriangle } from "lucide-react";

import { lowStockProducts } from "../../data/dashboardData";

const LowStockTable = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">

      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-accent" />

        <h2 className="text-xl font-semibold">
          Low Stock Products
        </h2>
      </div>

      <div className="space-y-4">
        {lowStockProducts.map((item) => (
          <div
            key={item.name}
            className="
            flex
            items-center
            justify-between
            border
            border-zinc-100
            rounded-2xl
            p-4
          "
          >
            <h3 className="font-medium">
              {item.name}
            </h3>

            <span
              className="
              bg-accent/20
              text-primary
              px-3
              py-1
              rounded-full
              text-sm
            "
            >
              {item.stock} Left
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LowStockTable;
