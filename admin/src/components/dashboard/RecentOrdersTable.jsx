import { recentOrders } from "../../data/dashboardData";

const RecentOrdersTable = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 overflow-auto">

      <h2 className="text-xl font-semibold mb-6">
        Recent Orders
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Order ID
            </th>

            <th className="text-left py-3">
              Customer
            </th>

            <th className="text-left py-3">
              Amount
            </th>

            <th className="text-left py-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr
              key={order.id}
              className="border-b"
            >
              <td className="py-4">
                {order.id}
              </td>

              <td>{order.customer}</td>

              <td>{order.amount}</td>

              <td>
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  bg-green-100
                  text-green-700
                "
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default RecentOrdersTable;