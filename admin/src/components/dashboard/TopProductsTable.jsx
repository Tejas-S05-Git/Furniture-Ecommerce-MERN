import { topProducts } from "../../data/dashboardData";

const TopProductsTable = () => {
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
          {topProducts.map((item) => (
            <tr
              key={item.name}
              className="border-b"
            >
              <td className="py-4">
                {item.name}
              </td>

              <td>{item.sales}</td>

              <td>{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TopProductsTable;