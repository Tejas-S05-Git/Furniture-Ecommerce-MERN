
const TopProductsTable = ({ products = [], }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 overflow-auto">

      <h2 className="text-xl font-semibold mb-6">
        Top Products
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Product
            </th>

            <th className="text-left py-3">
              Sales
            </th>

            <th className="text-left py-3">
              Revenue
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr
              key={item._id}
              className="border-b"
            >
              <td className="py-4">
                <div className="flex items-center gap-3">

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div>

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-500">
                      ₹{item.price}
                    </p>

                  </div>

                </div>
              </td>
              <td>{item.totalSold}</td>

              <td>₹{item.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TopProductsTable;