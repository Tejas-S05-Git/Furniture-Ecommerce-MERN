import { AlertTriangle } from "lucide-react";



const LowStockTable = ({
  products = [],
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">

      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="text-accent" />

        <h2 className="text-xl font-semibold">
          Low Stock Products
        </h2>
      </div>

      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item._id}
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
            <div className="flex items-center gap-3">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-14 h-14 rounded-xl object-cover"
              />

              <div>

                <h3 className="font-medium">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-500">
                  ₹{item.price}
                </p>

              </div>

            </div>
            <span
              className={`
    px-3
    py-1
    rounded-full
    text-sm
    ${item.quantity <= 2
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
                }
  `}
            >
              {item.quantity} Left
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LowStockTable;
