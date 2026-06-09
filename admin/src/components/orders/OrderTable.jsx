import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const OrderTable = ({
  orders,
  setDeleteModal,
  setSelectedOrder,
}) => {
  const navigate = useNavigate();

  const columns = [
    "Order ID",
    "Customer",
    "Amount",
    "Payment",
    "Status",
    "Date",
    "Actions",
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      renderRow={(order) => (
        <tr
          key={order.id}
          className="
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition
          "
        >
          {/* Order ID */}
          <td className="px-6 py-4">
            <span
              className="
              font-semibold
              text-primary
              "
            >
              {order.id}
            </span>
          </td>

          {/* Customer */}
          <td className="px-6 py-4 min-w-[220px]">
            <div>
              <h3 className="font-medium">
                {order.customer.name}
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                "
              >
                {order.customer.email}
              </p>
            </div>
          </td>

          {/* Amount */}
          <td className="px-6 py-4">
            ₹{order.totalAmount}
          </td>

          {/* Payment */}
          <td className="px-6 py-4">
            <div className="space-y-1">
              <p className="font-medium">
                {order.paymentMethod}
              </p>

              <StatusBadge
                status={
                  order.paymentStatus ===
                  "Paid"
                    ? "active"
                    : "inactive"
                }
              />
            </div>
          </td>

          {/* Order Status */}
          <td className="px-6 py-4">
            <StatusBadge
              status={order.orderStatus}
            />
          </td>

          {/* Date */}
          <td className="px-6 py-4">
            {order.createdAt}
          </td>

          {/* Actions */}
          <td className="px-6 py-4">
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <button
                title="View Order"
                className="
                p-2
                rounded-xl
                hover:bg-primary/10
                transition
                "
                onClick={() =>
                  navigate(
                    `/admin/orders/view/${order.id}`
                  )
                }
              >
                <Eye
                  size={18}
                  className="text-primary"
                />
              </button>

              <button
                title="Delete Order"
                className="
                p-2
                rounded-xl
                hover:bg-red-100
                transition
                "
                onClick={() => {
                  setSelectedOrder(
                    order
                  );

                  setDeleteModal(true);
                }}
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default OrderTable;