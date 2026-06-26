import React from "react";
import { Eye, Trash2, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";

const OrderTable = ({ orders, setDeleteModal, setSelectedOrder }) => {
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

  // Helper function for standard Indian currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function for readable date formatting (e.g., 24 Oct 2023)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DataTable
      columns={columns}
      data={orders}
      renderRow={(order) => (
        <tr
          key={order._id}
          // Added 'group' for hover effects on child elements
          className="group border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors duration-200"
        >
          {/* Order ID - Added monospace font & badge look for scannability */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-zinc-100 text-xs font-medium text-zinc-600 font-mono tracking-tight uppercase">
              #{order._id.slice(-8)}
            </span>
          </td>

          {/* Customer - Improved vertical spacing */}
          <td className="px-6 py-4 whitespace-nowrap min-w-[220px]">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 capitalize">
                {order.customer?.firstName} {order.customer?.lastName}
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                {order.customer?.email}
              </span>
            </div>
          </td>

          {/* Amount - Proper currency formatting */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm font-semibold text-zinc-900">
              {formatCurrency(order.totalAmount)}
            </span>
          </td>

          {/* Payment - Added icon and better alignment */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-sm text-zinc-600 capitalize">
                <CreditCard size={14} className="text-zinc-400" />
                <span>{order.paymentMethod}</span>
              </div>
              <div>
                <StatusBadge status={order.paymentStatus} />
              </div>
            </div>
          </td>

          {/* Order Status */}
          <td className="px-6 py-4 whitespace-nowrap">
            <StatusBadge status={order.orderStatus} />
          </td>

          {/* Date - Formatted for better readability */}
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-zinc-600">
              {formatDate(order.createdAt)}
            </span>
          </td>

          {/* Actions - Subtle initial state, highlighted on row hover */}
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <div className="flex items-center gap-2 justify-start md:opacity-70 group-hover:opacity-100 transition-opacity">
              <button
                title="View Order Details"
                className="p-2 rounded-lg text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                onClick={() => navigate(`/admin/orders/view/${order._id}`)}
              >
                <Eye size={18} strokeWidth={2.5} />
              </button>

              <button
                title="Delete Order"
                className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                onClick={() => {
                  setSelectedOrder(order);
                  setDeleteModal(true);
                }}
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
};

export default OrderTable;