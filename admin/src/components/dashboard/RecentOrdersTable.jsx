
const RecentOrdersTable = ({ orders = [], }) => {
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
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-b"
            >
              <td className="py-4">
                #{order._id.slice(-6).toUpperCase()}
              </td>

              <td>{order.customer?.firstName}{" "}
                {order.customer?.lastName}</td>

              <td>₹{order.totalAmount.toLocaleString()}</td>

              <td>
                <span
  className={`px-3 py-1 rounded-full text-sm font-medium
  ${
    order.orderStatus === "pending"
      ? "bg-yellow-100 text-yellow-700"

      : order.orderStatus === "processing"
      ? "bg-blue-100 text-blue-700"

      : order.orderStatus === "shipped"
      ? "bg-purple-100 text-purple-700"

      : order.orderStatus === "delivered"
      ? "bg-green-100 text-green-700"

      : "bg-red-100 text-red-700"
  }`}
>
  {order.orderStatus}
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